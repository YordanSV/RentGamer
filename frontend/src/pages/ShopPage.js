import React from 'react';
import CategoryCarousel from '../components/shop/CategoryCarousel';
import { useGames } from '../contexts/GamesContext';
import './shopPage.css';

const ShopPage = () => {
  // Usar el contexto de juegos que ya precargó los datos
  const { games, loading, error } = useGames();

  if (loading) {
    return (
      <div className="shop-container">
        <h1 className='h1'>Nuestra Tienda</h1>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Cargando juegos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-container">
        <h1 className='h1'>Nuestra Tienda</h1>
        <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
          <p>Error al cargar los juegos: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <h1 className='h1'>Nuestra Tienda</h1>
      {games.length > 0 ? (
        <CategoryCarousel games={games} />
      ) : (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>No hay juegos disponibles</p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
