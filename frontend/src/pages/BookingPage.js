import React, { useState } from 'react';
import { FaCalendarAlt, FaGamepad, FaTruck, FaShieldAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import './bookingPage.css';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gameTitle: '',
    startDate: '',
    endDate: '',
    platform: '',
    address: '',
    city: '',
    zipCode: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar a la API
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
    
    // Resetear formulario después de 3 segundos
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        gameTitle: '',
        startDate: '',
        endDate: '',
        platform: '',
        address: '',
        city: '',
        zipCode: '',
        notes: ''
      });
    }, 3000);
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
            {/* Form */}
            <div className="booking-form-container">
              <h2>Formulario de Reserva</h2>
              {submitted ? (
                <div className="success-message">
                  <FaCheckCircle className="success-icon" />
                  <h3>¡Reserva Recibida!</h3>
                  <p>Tu reserva ha sido enviada exitosamente. Pronto nos pondremos en contacto para confirmar los detalles.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="booking-form">
                  {/* Personal Information */}
                  <fieldset className="form-group">
                    <legend>Información Personal</legend>
                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="fullName">Nombre Completo *</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="email">Correo Electrónico *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>
                    <div className="form-field">
                      <label htmlFor="phone">Teléfono *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </fieldset>

                  {/* Game Information */}
                  <fieldset className="form-group">
                    <legend>Información del Juego</legend>
                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="gameTitle">Título del Juego *</label>
                        <input
                          type="text"
                          id="gameTitle"
                          name="gameTitle"
                          value={formData.gameTitle}
                          onChange={handleChange}
                          required
                          placeholder="Ej: The Legend of Zelda"
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="platform">Plataforma *</label>
                        <select
                          id="platform"
                          name="platform"
                          value={formData.platform}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Selecciona una plataforma</option>
                          <option value="PS5">PlayStation 5</option>
                          <option value="XSX">Xbox Series X</option>
                          <option value="Nintendo">Nintendo Switch</option>
                          <option value="PC">PC</option>
                          <option value="PS4">PlayStation 4</option>
                          <option value="XOne">Xbox One</option>
                        </select>
                      </div>
                    </div>
                  </fieldset>

                  {/* Rental Period */}
                  <fieldset className="form-group">
                    <legend>Período de Renta</legend>
                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="startDate">Fecha de Inicio *</label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="endDate">Fecha de Fin *</label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Delivery Address */}
                  <fieldset className="form-group">
                    <legend>Información de Contacto Adicional</legend>
                    <div className="form-field">
                      <label htmlFor="address">País *</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Tu país"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="city">Región/Estado *</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          placeholder="Tu región"
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="zipCode">Código Postal (Opcional)</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Additional Notes */}
                  <fieldset className="form-group">
                    <legend>Observaciones Adicionales</legend>
                    <div className="form-field">
                      <label htmlFor="notes">Notas (Opcional)</label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Cuéntanos si hay algo especial que debamos saber..."
                        rows="4"
                      ></textarea>
                    </div>
                  </fieldset>

                  <button type="submit" className="submit-button">Enviar Reserva</button>
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
              <div className="benefit">
                <FaTruck className="benefit-icon" />
                <h4>Sin Instalación</h4>
                <p>Juega en streaming sin descargar ni instalar</p>
              </div>
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
              
              <div className="pricing-info">
                <h4>Precios por Día</h4>
                <ul>
                  <li>1-2 días: $5.99/día</li>
                  <li>3-7 días: $4.99/día</li>
                  <li>8+ días: $3.99/día</li>
                </ul>
              </div>
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
              <h4>¿Cuál es el período mínimo de renta?</h4>
              <p>El período mínimo es de 1 día. Puedes acceder al juego durante el tiempo que necesites.</p>
            </div>
            <div className="faq-item">
              <h4>¿Qué dispositivos puedo usar?</h4>
              <p>Accede desde cualquier dispositivo: PC, consola, tablet o smartphone. Solo necesitas conexión a internet.</p>
            </div>
            <div className="faq-item">
              <h4>¿Es inmediato el acceso?</h4>
              <p>Sí, una vez confirmada tu reserva, tendrás acceso instantáneo al juego sin tiempos de espera.</p>
            </div>
            <div className="faq-item">
              <h4>¿Puedo cancelar mi reserva?</h4>
              <p>Sí, puedes cancelar hasta 24 horas antes de la fecha de inicio sin penalización.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
