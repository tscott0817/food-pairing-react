import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import CompareIngredients from './pages/compareIngredients';
import CompareIngredientsGlobal from "./pages/compareIngredientsGlobal";
import SearchByCategory from "./pages/searchByCategory";
import IngredientPage from "./pages/ingredientPage";
import DefaultPage from "./pages/defaultPage";
import {useIngredientContext} from "./stateManager/IngredientContext";
import {mainAppColor} from "./colors";
import './animations.css';


function App() {
    const [currentPage, setCurrentPage] = useState('defaultPage');
    const [key, setKey] = useState(0); // Add a key state
    const [selectedIngredientRef, setSelectedIngredientRef] = useState(null);  // Pretending this is like a 'fake' pointer
    const {selectedIngredients, unselectIngredient} = useIngredientContext();
    const [displayIngredient, setDisplayIngredient] = useState(false);


    // TODO: Apparently callback better? Not sure why
    const handleDisplayIngredient = useCallback((displayIngredient) => {
        setDisplayIngredient(displayIngredient);
    }, [setDisplayIngredient]);

    const handlePageChange = useCallback((page) => {
        setKey((prevKey) => prevKey + 1);
        setCurrentPage(page);
        handleDisplayIngredient(false);
    }, [setKey, setCurrentPage, handleDisplayIngredient]);

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
        <div key={key} className="App" style={{display: 'flex', flexDirection: 'column'}}>
            <div className="navigation-bar" style={{
                padding: '1%',
                backgroundColor: '#f0f0f0',
                width: '100%',
                height: '60px',
                display: 'flex',
                position: 'fixed',
                justifyContent: 'space-around',
                zIndex: 2
            }}>
                <button onClick={() => handlePageChange('defaultPage')}>Default Page</button>
                {/*<button onClick={() => handlePageChange('compareIngredients')}>Compare Ingredients</button>*/}
                {/*<button onClick={() => handlePageChange('searchByName')}>Search By Name</button>*/}
                <button onClick={() => handlePageChange('searchByCategory')}>Search By Category</button>
                {/*<button onClick={() => handlePageChange('ingredientPage')}>Ingredient Page</button>*/}
            </div>

            <div className="main-layout"
                 style={{display: 'flex', flexGrow: 1, marginTop: '60px', position: 'relative', top: '3%',}}>
                <div className="left-column" style={{
                    flex: '1',
                    position: 'fixed',
                    padding: '1%',
                    width: '225px',
                    height: '50vh',
                    backgroundColor: '#e0e0e0',
                    overflowY: 'auto'
                }}>
                    {selectedIngredients.length > 0 && (
                        <div>
                            <button
                                onClick={() => handleRemoveIngredient(0)}>Remove {selectedIngredients[0].alias}</button>
                            {selectedIngredients.length > 1 && (
                                <button
                                    onClick={() => handleRemoveIngredient(1)}>Remove {selectedIngredients[1].alias}</button>
                            )}
                        </div>
                    )}
                    <button onClick={handleShowSelectedIngredients}>Show Selected Ingredients</button>
                    <h3>Search Filters</h3>
                    <ul>
                        <li>Filter 1</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 1</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 1</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                        <li>Filter 2</li>
                    </ul>
                </div>

                <div className="main-content" style={{flex: '1', marginLeft: '225px'}}>
                    {currentPage === 'defaultPage' && <DefaultPage setSelectedIngredientRef={setSelectedIngredientRef}
                                                                   handlePageChange={handlePageChange}
                                                                   handleDisplayIngredient={handleDisplayIngredient}/>}
                    {currentPage === 'compareIngredientsGlobal' &&
                        <CompareIngredientsGlobal ingredient1={selectedIngredients[0]}
                                                  ingredient2={selectedIngredients[1]}/>}
                    {/*{currentPage === 'ingredientPage' && <IngredientPage ingredient={selectedIngredientRef.current}/>}*/}
                </div>
                {displayIngredient && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(55, 55, 55, 0.9)',
                        zIndex: 2,
                        // overflow: 'hidden'
                    }}>
                        <div>
                            <button onClick={() => setDisplayIngredient(false)}>Go Back</button>
                        </div>
                        <IngredientPage ingredient={selectedIngredientRef.current}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
