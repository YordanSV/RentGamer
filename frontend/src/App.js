import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { games } from './data/games';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import GameDetails from './components/shop/GameDetails';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/game/:id" element={<GameDetails games={games} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}


export default App;
