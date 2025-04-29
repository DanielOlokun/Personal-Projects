import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthorInfo from '../components/AuthorInfo';

function AuthorDetailPage() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthorDetails() {
      try {
        const authorRes = await axios.get(`http://127.0.0.1:8000/api/authors/${id}/`);
        setAuthor(authorRes.data);

        const booksRes = await axios.get(`http://127.0.0.1:8000/api/books/?author=${id}`);
        setBooks(booksRes.data);
      } catch (error) {
        console.error('Error fetching author details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthorDetails();
  }, [id]);

  if (loading) {
    return <div>Loading author details...</div>;
  }

  if (!author) {
    return <div>Author not found.</div>;
  }

  return (
    <div>
      <AuthorInfo name={author.name} bio={author.bio} />

      <h3>Books by {author.name}</h3>
      {books.length === 0 ? (
        <p>No books found for this author.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> (Published: {book.published_date})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AuthorDetailPage;

