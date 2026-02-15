import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import RegisterPage from './pages/RegisterPage';
import GameDetails from './components/shop/GameDetails';
import SubscriptionPage from './pages/SubscriptionPage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/game/:id" element={<GameDetails />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
