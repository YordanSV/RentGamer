import React from 'react';

const FormularioTenable = () => {
  return (
    <div style={styles.body}>
      <div style={styles.background}></div>
      <div style={styles.container}>
        <h1 style={styles.h1}>Vea a Tenable en acción</h1>
        <p style={styles.p}>
          ¿Quiere ver cómo Tenable puede ayudar a su equipo a exponer y cerrar las debilidades cibernéticas prioritarias que ponen en riesgo su negocio? Complete este formulario para obtener más información.
        </p>
        <form style={styles.form}>
          <input type="text" placeholder="Nombre de pila" style={styles.input} />
          <input type="text" placeholder="Apellido" style={styles.input} />
          <input type="email" placeholder="Dirección de correo electrónico" style={styles.input} />
          <input type="tel" placeholder="Teléfono" style={styles.input} />
          <input type="text" placeholder="Título" style={styles.input} />
          <input type="text" placeholder="Compañía" style={styles.input} />
          <select style={styles.input}>
            <option>Tamaño de la empresa</option>
            <option>1-10 empleados</option>
            <option>11-50 empleados</option>
            <option>51-200 empleados</option>
            <option>201-500 empleados</option>
            <option>501-1000 empleados</option>
            <option>1001+ empleados</option>
          </select>
          <select style={styles.input}>
            <option>Estoy interesado en:</option>
            <option>Seguridad de la red</option>
            <option>Gestión de vulnerabilidades</option>
            <option>Seguridad en la nube</option>
            <option>Otro</option>
          </select>
          <textarea
            placeholder="Comentarios (limitados a 255 caracteres):"
            maxLength="255"
            style={{ ...styles.input, ...styles.textarea }}
          ></textarea>
          <button type="submit" style={styles.submitBtn}>Entregar</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, #00084A 50%, #007BFF 50%)',
    clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 60%)',
  },
  container: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  h1: {
    fontSize: '24px',
    color: '#00084A',
    marginBottom: '10px',
  },
  p: {
    fontSize: '16px',
    color: '#00084A',
    marginBottom: '20px',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  textarea: {
    gridColumn: 'span 2',
    resize: 'none',
  },
  submitBtn: {
    gridColumn: 'span 2',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default FormularioTenable;
