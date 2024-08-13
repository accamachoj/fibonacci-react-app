// src/App.js
import React from 'react';
import { FibonacciProvider } from './context/FibonacciContext';
import FibonacciForm from './components/FibonacciForm';
import FibonacciList from './components/FibonacciList';

function App() {
  return (
    <FibonacciProvider>
      <FibonacciForm />
      <FibonacciList />
    </FibonacciProvider>
  );
}

export default App;