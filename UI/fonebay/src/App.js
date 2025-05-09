import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Pages/Navbar';
import Cart from './Pages/Cart';
import Wishlist from './Pages/Wishlist';
import Order from './Pages/Order';
import Brand from './Pages/Brand';
import Carousel from './Pages/Carousel';
import Trending from './Pages/Trending';
import Product from './Pages/Product';
import ProductList from './Pages/ProductList';
import SortContainer from './Pages/SortContainer';
import Filter from './Pages/Filter';
import LodingScreen from './Pages/ProductSkeleton'
import Login from './Pages/login';
import Profile from './Pages/Profile';
import Address from './Pages/Address';
import ProfileDetails from './Pages/ProfileDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/search" element={<Home/>}/>
        <Route path="/account/address" element={<Address/>}/>
        <Route path='/brand' element={<Brand/>}/>
        <Route path='/carousel' element={<Carousel/>}/>
        <Route path='/trending' element={<Trending/>}/>
        <Route path='/products/:brand' element={<ProductList/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/view-profile' element={<ProfileDetails/>}/>
        <Route path='/filter' element={<Filter/>}/>
        <Route path='/sort' element={<SortContainer/>}/>
        <Route path='/account/orders' element={<Order/>}/>
        <Route path="/account/cart" element={<Cart/>}/>
        <Route path="/account/wishlist" element={<Wishlist/>}/>
        <Route path='/loader' element={<LodingScreen/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
