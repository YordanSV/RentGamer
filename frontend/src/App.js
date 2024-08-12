// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { games } from './data/games';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import GameDetails from './components/shop/GameDetails';

// En tu componente de React
import React, { useEffect, useState } from 'react';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Hacer la solicitud GET al backend
    fetch('http://localhost:3001/select')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <div>
        <h1>Datos desde el backend:</h1>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
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
