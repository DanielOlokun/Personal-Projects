// src/pages/OverdueBorrowingsPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import BorrowingCard from '../components/BorrowingCard';

function OverdueBorrowingsPage() {
  const [borrowings, setBorrowings] = useState([]);
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOverdueBorrowings() {
      try {
        // Fetch all overdue borrowings
        const borrowingResponse = await axios.get('http://127.0.0.1:8000/api/borrowings/?overdue=true');
        const borrowingData = borrowingResponse.data;
        setBorrowings(borrowingData);

        // Fetch related books
        const bookRequests = borrowingData.map(borrowing =>
          axios.get(`http://127.0.0.1:8000/api/books/${borrowing.book}/`)
        );
        const bookResponses = await Promise.all(bookRequests);

        // Map book ID to book title
        const booksData = {};
        bookResponses.forEach(res => {
          booksData[res.data.id] = res.data.title;
        });
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching overdue borrowings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOverdueBorrowings();
  }, []);

  if (loading) {
    return <div>Loading overdue borrowings...</div>;
  }

  return (
    <div>
      <h1>Overdue Borrowings</h1>
      {borrowings.length === 0 ? (
        <p>No overdue borrowings found.</p>
      ) : (
        borrowings.map(borrowing => (
          <BorrowingCard
            key={borrowing.id}
            bookTitle={books[borrowing.book] || "Loading book title..."}
            checkoutDate={borrowing.checkout_date}
            dueDate={borrowing.due_date}
            overdue={borrowing.overdue}
          />
        ))
      )}
    </div>
  );
}

export default OverdueBorrowingsPage;
