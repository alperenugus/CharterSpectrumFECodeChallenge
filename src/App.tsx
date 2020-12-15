import React from 'react';
import './App.css';
import Restaurants from './components/Restaurants/Restaurants';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className='App'>
      <div className='container'>
        <Restaurants></Restaurants>
      </div>
    </div>
  );
}

export default App;
