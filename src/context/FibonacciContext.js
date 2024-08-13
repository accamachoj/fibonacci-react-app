// src/context/FibonacciContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

const FibonacciContext = createContext();

export function FibonacciProvider({ children }) {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);

  const generateSeries = async (hours, minutes, seconds) => {
    try {
      const response = await axios.post('http://localhost:8080/api/fibonacci', { hours, minutes, seconds });
      setSeries([response.data, ...series]);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Error generating Fibonacci series');
      throw err;
    }
  };

  const getSeriesHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/fibonacci/history');
      setSeries(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching Fibonacci series history');
    }
  };

  return (
    <FibonacciContext.Provider value={{ series, generateSeries, getSeriesHistory, error }}>
      {children}
    </FibonacciContext.Provider>
  );
}

export default FibonacciContext;