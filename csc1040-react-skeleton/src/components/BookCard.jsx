function BookCard({ title, publishedDate, isbn }) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px", marginBottom: "15px" }}>
        <h3>{title}</h3>
        <p><strong>Published:</strong> {publishedDate}</p>
        <p><strong>ISBN:</strong> {isbn}</p>
      </div>
    );
  }
  
  export default BookCard;
  