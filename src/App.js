import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Navbar from './component/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/product-detail/:id" element={<ProductDetail/>}/>
          <Route path="/cart" element={<Cart/>} />
      </Routes>
    </>
  )
}

export default App
