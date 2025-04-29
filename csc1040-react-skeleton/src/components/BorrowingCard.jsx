function BorrowingCard({ bookTitle, checkoutDate, dueDate, overdue }) {
    return (
      <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px", marginBottom: "15px" }}>
        <h3>{bookTitle}</h3>
        <p><strong>Checkout Date:</strong> {checkoutDate}</p>
        <p><strong>Due Date:</strong> {dueDate}</p>
        <p><strong>Overdue:</strong> {overdue ? 'Yes' : 'No'}</p>
      </div>
    );
  }
  
  export default BorrowingCard;
  