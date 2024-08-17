// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { games } from './data/games';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import RegisterPage from './pages/RegisterPage';
import GameDetails from './components/shop/GameDetails';

// En tu componente de React
// import React, { useEffect, useState } from 'react';


function App() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   // Hacer la solicitud GET al backend
  //   fetch('https://rentgamer-production.up.railway.app/select')
  //     .then(response => response.json())
  //     .then(data => setData(data))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
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
