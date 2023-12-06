import React, { useState, useEffect } from 'react';
import './App.css';
import SearchByName from './pages/searchByName';
import CompareIngredients from './pages/compareIngredients';
import SearchByCategory from "./pages/searchByCategory";
import MouseTracker from './components/mouseTracker';
import IngredientPage from "./pages/ingredientPage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DefaultPage from "./pages/defaultPage";




function App() {
    const [currentPage, setCurrentPage] = useState('defaultPage');

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="App">
            <button onClick={() => handlePageChange('defaultPage')}>
                Default Page
            </button>
            <button onClick={() => handlePageChange('compareIngredients')}>
                Compare Ingredients
            </button>
            <button onClick={() => handlePageChange('searchByName')}>
                Search By Name
            </button>
            <button onClick={() => handlePageChange('searchByCategory')}>
                Search By Category
            </button>
            <button onClick={() => handlePageChange('ingredientPage')}>
                Ingredient Page
            </button>
            {/*<MouseTracker />*/}


            {currentPage === 'defaultPage' && <DefaultPage />}
            {currentPage === 'compareIngredients' && <CompareIngredients />}
            {currentPage === 'searchByName' && <SearchByName />}
            {currentPage === 'searchByCategory' && <SearchByCategory />}
            {currentPage === 'ingredientPage' && <IngredientPage />}
        </div>
    );
}

export default App;
