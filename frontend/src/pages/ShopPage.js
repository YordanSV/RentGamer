import React from 'react';
import CategoryCarousel from '../components/shop/CategoryCarousel';
import useApi from '../hooks/useApi';
import gameApi from '../api/gameApi';
import './shopPage.css';

const ShopPage = () => {
  const { data, loading, error } = useApi(() => gameApi.getAllGames());

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

  // useApi ya extrae la data del response { success: true, data: [...] }
  // Por lo tanto, 'data' directamente contiene el array de juegos
  const games = data || [];

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
