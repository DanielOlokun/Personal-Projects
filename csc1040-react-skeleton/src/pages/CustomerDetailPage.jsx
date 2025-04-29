import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerCard from '../components/CustomerCard';
import BorrowingCard from '../components/BorrowingCard';

function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [borrowings, setBorrowings] = useState([]);
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        const borrowingsResponse = await axios.get(`http://127.0.0.1:8000/api/borrowings/?customer=${id}`);
        const borrowingsData = borrowingsResponse.data;
        setBorrowings(borrowingsData);

        if (borrowingsData.length > 0) {
          const customerId = borrowingsData[0].customer;
          const customerResponse = await axios.get(`http://127.0.0.1:8000/api/customers/${customerId}/`);
          setCustomer(customerResponse.data);
        }

        const bookRequests = borrowingsData.map(borrowing =>
          axios.get(`http://127.0.0.1:8000/api/books/${borrowing.book}/`)
        );
        const bookResponses = await Promise.all(bookRequests);

        const booksData = {};
        bookResponses.forEach(res => {
          booksData[res.data.id] = res.data.title;
        });
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomerData();
  }, [id]);

  if (loading) {
    return <div>Loading customer information...</div>;
  }

  if (!customer) {
    return <div>Customer not found.</div>;
  }

  const fullName = `${customer.first_name} ${customer.last_name}`;

  return (
    <div>
      <CustomerCard 
        name={fullName} 
        email={customer.email} 
      />

      <h2>Borrowing History</h2>
      {borrowings.length === 0 ? (
        <p>No borrowings found for this customer.</p>
      ) : (
        borrowings.map(borrowing => (
          <BorrowingCard
            key={borrowing.id}
            bookTitle={books[borrowing.book] || 'Loading...'}
            checkoutDate={borrowing.checkout_date}
            dueDate={borrowing.due_date}
            overdue={borrowing.overdue}
          />
        ))
      )}
    </div>
  );
}

export default CustomerDetailPage;


