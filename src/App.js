import React, { useState, useEffect } from 'react';
import './App.css';
import SearchByName from './pages/searchByName';
import CompareIngredients from './pages/compareIngredients';
import SearchByCategory from "./pages/searchByCategory";


function App() {
    const [currentPage, setCurrentPage] = useState('compareIngredients');

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="App">
            <button onClick={() => handlePageChange('compareIngredients')}>
                Compare Ingredients
            </button>
            {/* Uncomment the following button if you have a component named SearchByName */}
            <button onClick={() => handlePageChange('searchByName')}>
                Search By Name
            </button>
            <button onClick={() => handlePageChange('searchByCategory')}>
                Search By Category
            </button>

            {currentPage === 'compareIngredients' && <CompareIngredients />}
            {currentPage === 'searchByName' && <SearchByName />}
            {currentPage === 'searchByCategory' && <SearchByCategory />}
        </div>
    );
}

export default App;
