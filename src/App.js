import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import CompareIngredients from './pages/compareIngredients';
import CompareIngredientsGlobal from "./pages/compareIngredientsGlobal";
import SearchByCategory from "./pages/searchByCategory";
import IngredientPage from "./pages/ingredientPage";
import DefaultPage from "./pages/defaultPage";
import {useIngredientContext} from "./stateManager/IngredientContext";
import {
    ingredientBackgroundColor,
    mainAppColor,
    navBarColor,
    pageSectionColor,
    randomTempColor,
    randomTempColor2
} from "./colors";
import './animations.css';


function App() {
    const [currentPage, setCurrentPage] = useState('defaultPage');
    const [key, setKey] = useState(0); // Add a key state
    const [selectedIngredientRef, setSelectedIngredientRef] = useState(null);  // Pretending this is like a 'fake' pointer
    const {selectedIngredients, unselectIngredient} = useIngredientContext();
    const [displayIngredient, setDisplayIngredient] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


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

    const handleSearchInputChange = event => {
        setSearchQuery(event.target.value);
    };

    return (
        <div key={key} className="App" style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{
                backgroundColor: navBarColor,
                width: '100%',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                zIndex: 1,
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                // border: '1px solid #000',
                // boxSizing: 'border-box',
            }}>
                {/*<button onClick={() => handlePageChange('defaultPage')}>Default Page</button>*/}
                <input
                    type="text"
                    placeholder="Search for ingredients..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    style={{width: '40%', minWidth: '400px', height: '80%'}}
                />
            </div>
            <div className="main-layout"
                 style={{display: 'flex', flexGrow: 1, marginTop: '60px', position: 'relative', top: '3%',}}>
                <div className="left-column" style={{
                    flex: '1',
                    position: 'fixed',
                    padding: '1%',
                    width: '225px',
                    height: '50vh',
                    backgroundColor: pageSectionColor,
                    border: '1px solid #000',
                    boxSizing: 'border-box',
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
                                                                   handleDisplayIngredient={handleDisplayIngredient}
                                                                   searchQuery={searchQuery}/>}
                    {currentPage === 'compareIngredientsGlobal' && (
                        <div>
                            <div style={{
                                backgroundColor: randomTempColor2,
                                height: '40px',
                                width: '100%',
                                position: 'fixed',
                                display: 'flex',
                                alignItems: 'center',
                                zIndex: 1,
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'
                            }}>
                                <button onClick={() => handlePageChange('defaultPage')} style={{marginLeft: '8px'}}>
                                    Go Back
                                </button>
                            </div>
                            <CompareIngredientsGlobal
                                ingredient1={selectedIngredients[0]}
                                ingredient2={selectedIngredients[1]}
                            />
                        </div>
                    )}
                </div>
                {displayIngredient && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: ingredientBackgroundColor,
                        zIndex: 1  // TODO: Not sure if I want 0 or 1
                    }}>
                        <IngredientPage ingredient={selectedIngredientRef.current}/>
                        <div>
                            <button onClick={() => setDisplayIngredient(false)}>Go Back</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
