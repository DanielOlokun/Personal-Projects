import { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

function GenreBooksPage() {
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState('');
  const [books, setBooks] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(false);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/genres/');
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoadingGenres(false);
      }
    }

    fetchGenres();
  }, []);

  async function handleGenreChange(event) {
    const genreId = event.target.value;
    setSelectedGenreId(genreId);

    if (genreId) {
      setLoadingBooks(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/books/?genre=${genreId}`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books by genre:', error);
      } finally {
        setLoadingBooks(false);
      }
    } else {
      setBooks([]);
    }
  }

  return (
    <div>
      <h1>Books by Genre</h1>

      {loadingGenres ? (
        <p>Loading genres...</p>
      ) : (
        <select value={selectedGenreId} onChange={handleGenreChange}>
          <option value="">Select a genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      )}

      <div style={{ marginTop: '20px' }}>
        {loadingBooks ? (
          <p>Loading books...</p>
        ) : selectedGenreId ? (
          books.length === 0 ? (
            <p>No books found in this genre.</p>
          ) : (
            books.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                publishedDate={book.published_date}
                isbn={book.isbn}
              />
            ))
          )
        ) : (
          <p>Please select a genre to view books.</p>
        )}
      </div>
    </div>
  );
}

export default GenreBooksPage;
