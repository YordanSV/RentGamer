/**
 * Contexto de juegos
 * Precarga los datos al iniciar la aplicación para optimizar la experiencia
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import gameApi from "../api/gameApi";

const GamesContext = createContext();

export const useGames = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error('useGames debe ser usado dentro de GamesProvider');
  }
  return context;
};

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Precargar datos al montar el componente
  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await gameApi.getAllGames();
        
        if (result?.success) {
          setGames(result.data || []);
        } else {
          setError(result?.error || 'Error al cargar los juegos');
        }
      } catch (err) {
        setError(err?.message || 'Error al cargar los juegos');
        console.error('Error cargando juegos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Función para refrescar los datos si es necesario
  const refreshGames = async () => {
    try {
      setLoading(true);
      const result = await gameApi.getAllGames();
      if (result?.success) {
        setGames(result.data || []);
      }
    } catch (err) {
      console.error('Error refrescando juegos:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    games,
    loading,
    error,
    refreshGames,
  };

  return (
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  );
};
