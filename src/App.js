import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListProduct from './components/ListProduct';
import Footer from './components/Footer';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import ListClient from './components/ListClient';
import AddClient from './components/AddClient';
import Home from './components/Home';
import ClientProductAnalytics from './components/ClientProductAnalytics';
import WelcomePage from './components/WelcomePage';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/products" element={<ListProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<AddProduct />} />
          <Route path="/clients" element={<ListClient />} />
          <Route path="/buy-product" element={<AddClient />} />
          <Route path="/edit-client/:id" element={<AddClient />} />
          <Route path="/report" element={<ClientProductAnalytics />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;