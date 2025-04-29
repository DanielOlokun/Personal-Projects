function CustomerCard({ name, email, phoneNumber, address }) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <h2>{name}</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phoneNumber}</p>
        <p><strong>Address:</strong> {address}</p>
      </div>
    );
  }
  
  export default CustomerCard;
  