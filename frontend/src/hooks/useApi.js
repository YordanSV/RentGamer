/**
 * Hook personalizado para manejar llamadas a la API
 * Simplifica el uso de llamadas asíncronas en componentes
 */

import { useState, useEffect } from 'react';

const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        
        if (isMounted) {
          if (result.success) {
            setData(result.data);
          } else {
            setError(result.error || 'Error desconocido');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Error al cargar datos');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Error desconocido');
      }
    } catch (err) {
      setError(err.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useApi;


