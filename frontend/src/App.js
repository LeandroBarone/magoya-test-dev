import React from 'react';
import Navbar from './Navbar';
import Transacciones from './Transacciones';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <Transacciones />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
