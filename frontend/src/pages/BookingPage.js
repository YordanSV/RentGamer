
import React, { useState, useMemo } from 'react';
import { FaCalendarAlt, FaGamepad, FaTruck, FaShieldAlt, FaClock, FaCheckCircle, FaSearch } from 'react-icons/fa';
import './bookingPage.css';
import { useGames } from '../contexts/GamesContext';
import { useCart } from '../contexts/CartContext';

const MIN_RENTAL_DAYS = 30;

const BookingPage = () => {
  const { games } = useGames();
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showGameDropdown, setShowGameDropdown] = useState(false);

  // Filtrar categorías únicas
  const categories = useMemo(() => {
    const cats = games.map(g => g.category_name || g.category || 'Sin categoría');
    return Array.from(new Set(cats));
  }, [games]);

  // Filtrar juegos por búsqueda y categoría
  const filteredGames = useMemo(() => {
    let filtered = games;
    if (selectedCategory) {
      filtered = filtered.filter(g => (g.category_name || g.category) === selectedCategory);
    }
    if (search) {
      filtered = filtered.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));
    }
    return filtered;
  }, [games, search, selectedCategory]);

  // Calcular fecha mínima de fin
  const minEndDate = useMemo(() => {
    if (!startDate) return '';
    const d = new Date(startDate);
    d.setDate(d.getDate() + MIN_RENTAL_DAYS - 1);
    return d.toISOString().split('T')[0];
  }, [startDate]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!selectedGame || !startDate) return;
    const endDate = minEndDate;
    addToCart({
      ...selectedGame,
      startDate,
      endDate,
      rentalType: 'mensual',
      quantity: 1
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedGame(null);
      setStartDate('');
      setSearch('');
      setSelectedCategory('');
    }, 2500);
  };

  return (
    <div className="booking-page">
      {/* Hero Section */}
      <section className="booking-hero">
        <div className="hero-content">
          <h1>Reserva tu Juego Favorito</h1>
          <p>Accede inmediatamente a los mejores juegos en línea sin descargas ni esperas</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>¿Cómo Funciona?</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <FaGamepad className="step-icon" />
              <h3>Selecciona tu Juego</h3>
              <p>Elige el juego que deseas rentar de nuestro catálogo completo</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <FaCalendarAlt className="step-icon" />
              <h3>Elige las Fechas</h3>
              <p>Selecciona los días de inicio y final de tu renta</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <FaTruck className="step-icon" />
              <h3>Acceso Inmediato</h3>
              <p>Obtén acceso instantáneo a tu juego en línea</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <FaCheckCircle className="step-icon" />
              <h3>¡Disfruta!</h3>
              <p>Juega sin preocupaciones durante tu período de renta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Booking Form Section */}
      <section className="booking-section">
        <div className="container">
          <div className="booking-content">
            <div className="booking-form-container">
              <h2>Reserva mensual de juegos</h2>
              {submitted ? (
                <div className="success-message">
                  <FaCheckCircle className="success-icon" />
                  <h3>¡Juego agregado al carrito!</h3>
                  <p>Tu reserva mensual fue agregada al carrito. Puedes pagar desde el carrito.</p>
                </div>
              ) : (
                <form onSubmit={handleAddToCart} className="booking-form">
                  <div className="form-group">
                    <h3 className="form-title">Buscar o seleccionar juego</h3>
                    <div className="form-row">
                      <div className="form-field" style={{ flex: 2, position: 'relative' }}>
                        <label htmlFor="search">Buscar juego</label>
                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                          <input
                            type="text"
                            id="search"
                            name="search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Escribe el nombre del juego..."
                            autoComplete="off"
                            style={{ zIndex: 2 }}
                          />
                          <FaSearch style={{ marginLeft: 8, color: '#007bff', zIndex: 2 }} />
                          {search && filteredGames.length > 0 && (
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              right: 0,
                              background: '#1a1a2e',
                              border: '1px solid #007bff',
                              borderRadius: '0 0 8px 8px',
                              maxHeight: 220,
                              overflowY: 'auto',
                              zIndex: 10,
                              boxShadow: '0 8px 24px rgba(0,123,255,0.15)'
                            }}>
                              {filteredGames.slice(0, 8).map(game => (
                                <div
                                  key={game.id}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #223',
                                    background: selectedGame && selectedGame.id === game.id ? '#003d82' : 'transparent'
                                  }}
                                  onClick={() => {
                                    setSelectedGame(game);
                                    setSearch(game.name);
                                  }}
                                >
                                  <img src={game.image} alt={game.name} style={{ width: 38, height: 38, objectFit: 'contain', borderRadius: 6, marginRight: 12, background: '#222' }} />
                                  <span style={{ color: '#e0e0e0', fontWeight: 500 }}>{game.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-field" style={{ flex: 1 }}>
                        <label htmlFor="category">Categoría</label>
                        <select
                          id="category"
                          name="category"
                          value={selectedCategory}
                          onChange={e => setSelectedCategory(e.target.value)}
                        >
                          <option value="">Todas</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-field" style={{ width: '100%' }}>
                        <label htmlFor="game">Selecciona el juego</label>
                        <div style={{ position: 'relative' }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              background: '#1a1a2e',
                              border: '2px solid #3a4a5e',
                              borderRadius: 8,
                              padding: '0 0 0 0',
                              minHeight: 48,
                              cursor: 'pointer',
                              position: 'relative',
                              zIndex: 2
                            }}
                            onClick={e => {
                              setShowGameDropdown(v => !v);
                            }}
                            tabIndex={0}
                            onBlur={() => setTimeout(() => setShowGameDropdown(false), 150)}
                          >
                            {selectedGame ? (
                              <>
                                <img src={selectedGame.image} alt={selectedGame.name} style={{ width: 38, height: 38, objectFit: 'contain', borderRadius: 6, margin: '4px 12px 4px 8px', background: '#222' }} />
                                <span style={{ color: '#e0e0e0', fontWeight: 500 }}>{selectedGame.name} <span style={{ color: '#007bff', fontWeight: 400, fontSize: 13 }}>- {selectedGame.category}</span></span>
                              </>
                            ) : (
                              <span style={{ color: '#888', padding: 12 }}>-- Elige un juego --</span>
                            )}
                            <span style={{ marginLeft: 'auto', color: '#007bff', fontSize: 18, padding: '0 12px' }}>▼</span>
                          </div>
                          {showGameDropdown && (
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              right: 0,
                              background: '#1a1a2e',
                              border: '1px solid #007bff',
                              borderRadius: '0 0 8px 8px',
                              maxHeight: 220,
                              overflowY: 'auto',
                              zIndex: 10,
                              boxShadow: '0 8px 24px rgba(0,123,255,0.15)'
                            }}>
                              {filteredGames.length === 0 && (
                                <div style={{ color: '#888', padding: 12 }}>No hay juegos</div>
                              )}
                              {filteredGames.map(game => (
                                <div
                                  key={game.id}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #223',
                                    background: selectedGame && selectedGame.id === game.id ? '#003d82' : 'transparent'
                                  }}
                                  onClick={() => {
                                    setSelectedGame(game);
                                    setShowGameDropdown(false);
                                  }}
                                >
                                  <img src={game.image} alt={game.name} style={{ width: 38, height: 38, objectFit: 'contain', borderRadius: 6, marginRight: 12, background: '#222' }} />
                                  <span style={{ color: '#e0e0e0', fontWeight: 500 }}>{game.name} <span style={{ color: '#007bff', fontWeight: 400, fontSize: 13 }}>- {game.category}</span></span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Estado para mostrar el dropdown personalizado */}
                        {/* ...al inicio del componente: const [showGameDropdown, setShowGameDropdown] = useState(false); */}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <h3 className="form-title">Período de renta mensual</h3>
                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="startDate">Fecha de inicio *</label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={startDate}
                          onChange={e => setStartDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="endDate">Fecha de fin (mínimo 1 mes)</label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={minEndDate}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="submit-button" disabled={!selectedGame || !startDate}>Agregar al carrito</button>
                </form>
              )}
            </div>

            {/* Benefits Sidebar */}
            <aside className="booking-benefits">
              <h3>Ventajas de Rentar</h3>
              <div className="benefit">
                <FaShieldAlt className="benefit-icon" />
                <h4>Seguro Incluido</h4>
                <p>Protección total en cada renta sin costos adicionales</p>
              </div>
              {/* Eliminado: Sin Instalación */}
              <div className="benefit">
                <FaClock className="benefit-icon" />
                <h4>Flexible</h4>
                <p>Extiende tu renta cuando lo necesites</p>
              </div>
              <div className="benefit">
                <FaGamepad className="benefit-icon" />
                <h4>Gran Catálogo</h4>
                <p>Miles de juegos disponibles en varias plataformas</p>
              </div>
              
              {/* Eliminado: Precios por Día */}
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>¿Cuál es el período mínimo de alquiler?</h4>
              <p>El período mínimo es de 1 mes. Todas las reservas se realizan por mes completo.</p>
            </div>
            <div className="faq-item">
              <h4>¿Necesito registrarme para alquilar?</h4>
              <p>Sí, debes iniciar sesión o registrarte antes de pagar tu reserva.</p>
            </div>
            <div className="faq-item">
              <h4>¿Cómo recibo el acceso a mi juego?</h4>
              <p>Recibirás acceso digital al juego en tu cuenta después de completar el pago.</p>
            </div>
            <div className="faq-item">
              <h4>¿Puedo alquilar más de un juego a la vez?</h4>
              <p>Sí, puedes agregar varios juegos al carrito y alquilarlos juntos por mes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
