function AuthorInfo({ name, bio }) {
    return (
      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <h2>{name}</h2>
        <p>{bio}</p>
      </div>
    );
  }
  
  export default AuthorInfo;
  