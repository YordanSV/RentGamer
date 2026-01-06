/**
 * Hook personalizado para manejar llamadas a la API
 * Simplifica el uso de llamadas asíncronas en componentes
 */

import { useState, useEffect, useCallback } from 'react';

const useApi = (apiFunction, depsKey = '') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiFunction();

      if (result?.success) {
        setData(result.data);
      } else {
        setError(result?.error || 'Error desconocido');
      }
    } catch (err) {
      setError(err?.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!isMounted) return;
      await fetchData();
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [fetchData, depsKey]); // ✅ literal, sin spread, ESLint feliz

  return { data, loading, error, refetch: fetchData };
};

export default useApi;
