import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to my Library App 📚 </h1>
      <p>Why not browse our collection of books, genres, authors, and customer info ?</p>

      <div style={{ marginTop: '30px' }}>
        <Link to="/books" style={{ margin: '10px', display: 'inline-block' }}>All Books</Link>
        <Link to="/genres" style={{ margin: '10px', display: 'inline-block' }}>Browse by Genre</Link>
        <Link to="/overdue" style={{ margin: '10px', display: 'inline-block' }}>Overdue Borrowings</Link>
        <Link to="/customers" style={{ marginRight: "10px" }}>Customer Details</Link> 

    </div>      
    </div>
  );
}

export default WelcomePage;
