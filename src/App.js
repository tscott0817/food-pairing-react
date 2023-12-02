import React, { useState, useEffect } from 'react';
import './App.css';
import SearchByName from './pages/searchByName';
import CompareIngredients from './pages/compareIngredients';


function App() {
    return (
        <div className="App">
            <CompareIngredients />
            <SearchByName />
        </div>
    );
}

export default App;
