import { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

function AllBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/books/');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div>
      <h1>All Books</h1>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        books.map((book) => (
          <BookCard 
            key={book.id}
            title={book.title}
            publishedDate={book.published_date}
            isbn={book.isbn}
          />
        ))
      )}
    </div>
  );
}

export default AllBooksPage;
