import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Header from './components/Header';
import SideBar from "./Components/SideBar"
import Footer from './components/Footer';
import ScrollToTop from "./Components/ScrollToTop"


const App = () => {
  return <div className='overflow-hidden'>
    <Router>
    <ScrollToTop />
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
      </Routes>
      <SideBar />
      <Footer />
    </Router>
  </div>;
};

export default App;
