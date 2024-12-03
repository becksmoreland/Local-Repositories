// src/App.js
import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Form from './components/form';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Form />
      </main>
    </div>
  );
}

export default App;
