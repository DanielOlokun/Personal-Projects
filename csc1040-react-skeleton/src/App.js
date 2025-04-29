import './App.css';
import { ReactDOM } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Container from './Layouts/Container';
import HomePage from './Layouts/HomePage';
import SecondPage from './Layouts/SecondPage';
import WelcomePage from './pages/WelcomePage';
import AllBooksPage from './pages/AllBooksPage';
import AuthorDetailPage from './pages/AuthorDetailPage';
import GenreBooksPage from './pages/GenreBooksPage';
import OverdueBorrowingsPage from './pages/OverdueBorrowingsPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import FourOhFour from './Layouts/FourOhFour';

// WHEN creating routes, make sure to place them 
// BEFORE the FourOhFour page
function App() {
  return (
    <Router>
      <div>
    

      
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />  
            <Route path="/books" element={<AllBooksPage />} />
            <Route path="/author/:id" element={<AuthorDetailPage />} />
            <Route path="/genres" element={<GenreBooksPage />} />
            <Route path="/overdue" element={<OverdueBorrowingsPage />} />
            <Route path="/customer/:id" element={<CustomerDetailPage />} />
          </Routes>


          
        </div>
      </div>
    </Router>
  );
}


export default App;
