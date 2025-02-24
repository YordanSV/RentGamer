// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { games } from './data/games';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import RegisterPage from './pages/RegisterPage';
import GameDetails from './components/shop/GameDetails';
import ShoppingCart from './components/shop/ShoppingCart';
import SubscriptionPage from './pages/SubscriptionPage';


function App() {

  return (
    <Router>
      <Header />
      <ShoppingCart 
            onCheckout={() => console.log('Se ha pagado')} 
          />
      <main>
        <Routes>
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/game/:id" element={<GameDetails games={games} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}


export default App;
