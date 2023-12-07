import React, {useState, useEffect} from 'react';
import './App.css';
import SearchByName from './pages/searchByName';
import CompareIngredients from './pages/compareIngredients';
import CompareIngredientsGlobal from "./pages/compareIngredientsGlobal";
import SearchByCategory from "./pages/searchByCategory";
import MouseTracker from './components/mouseTracker';
import IngredientPage from "./pages/ingredientPage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DefaultPage from "./pages/defaultPage";
import {useIngredientContext} from "./stateManager/IngredientContext";


function App() {
  const [currentPage, setCurrentPage] = useState('defaultPage');
  const [key, setKey] = useState(0); // Add a key state
  const [selectedIngredientRef, setSelectedIngredientRef] = useState(null);  // Pretending this is like a 'fake' pointer

  const { selectedIngredients, unselectIngredient } = useIngredientContext();

  const handlePageChange = (page) => {
    setKey((prevKey) => prevKey + 1);
    setCurrentPage(page);
  };

  const handleShowSelectedIngredients = () => {
    console.log('Selected Ingredients:', selectedIngredients);
    handlePageChange('compareIngredientsGlobal');
  };

  const handleRemoveIngredient = (index) => {
    if (selectedIngredients.length >= index + 1) {
      const ingredientToRemove = selectedIngredients[index];
      unselectIngredient(ingredientToRemove);
    }
  };

  return (
    <div key={key} className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="navigation-bar" style={{ padding: '1%', backgroundColor: '#f0f0f0', width: '100%', display: 'flex', position: 'fixed', justifyContent: 'space-around', zIndex: 1 }}>
        <button onClick={() => handlePageChange('defaultPage')}>Default Page</button>
        <button onClick={() => handlePageChange('compareIngredients')}>Compare Ingredients</button>
        <button onClick={() => handlePageChange('searchByName')}>Search By Name</button>
        <button onClick={() => handlePageChange('searchByCategory')}>Search By Category</button>
        <button onClick={() => handlePageChange('ingredientPage')}>Ingredient Page</button>
      </div>

      <div className="main-layout" style={{ backgroundColor: 'red', display: 'flex', flexGrow: 1, marginTop: '3%', position: 'relative', top: '3%' }}>
        <div className="left-column" style={{ flex: '1', position: 'fixed', padding: '1%', width: '10%', height: '50vh', backgroundColor: '#e0e0e0' }}>
          {selectedIngredients.length > 0 && (
            <div>
              <button onClick={() => handleRemoveIngredient(0)}>Remove {selectedIngredients[0].alias}</button>
              {selectedIngredients.length > 1 && (
                <button onClick={() => handleRemoveIngredient(1)}>Remove {selectedIngredients[1].alias}</button>
              )}
            </div>
          )}
          <button onClick={handleShowSelectedIngredients}>Show Selected Ingredients</button>
          <h3>Search Filters</h3>
          <ul>
            <li>Filter 1</li>
            <li>Filter 2</li>
          </ul>
        </div>

        <div className="main-content" style={{ flex: '1', marginLeft: '10%'}}>
          {currentPage === 'defaultPage' && <DefaultPage setSelectedIngredientRef={setSelectedIngredientRef} handlePageChange={handlePageChange}/>}
          {currentPage === 'compareIngredients' && <CompareIngredients />}
          {currentPage === 'compareIngredientsGlobal' && <CompareIngredientsGlobal ingredient1={selectedIngredients[0]} ingredient2={selectedIngredients[1]} />}
          {currentPage === 'searchByCategory' && <SearchByCategory />}
          {currentPage === 'ingredientPage' && <IngredientPage ingredient={selectedIngredientRef.current} />}
        </div>
      </div>
    </div>
  );
}

export default App;
