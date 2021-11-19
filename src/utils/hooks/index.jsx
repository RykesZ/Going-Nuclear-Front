import { useState, useEffect, useContext, useRef } from 'react';
import { BurgerContext } from '../context';
import * as d3 from 'd3';

export function useFetch(url) {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);
  return { isLoading, data, error };
}

export function useVisibility() {
  const { burgerVisibility, toggleVisibility } = useContext(BurgerContext);
  return { burgerVisibility, toggleVisibility };
}

export function useD3(renderChartFn, dependencies) {
  const ref = useRef();

  useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, [dependencies]); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}

export function useWindowDimensions() {
  function getWindowsDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowsDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowsDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
