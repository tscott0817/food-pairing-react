import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import CompareIngredients from './pages/compareIngredients';
import CompareIngredientsGlobal from "./pages/compareIngredientsGlobal";
import SearchByCategory from "./pages/searchByCategory";
import IngredientPage from "./pages/ingredientPage";
import DefaultPage from "./pages/defaultPage";
import {useIngredientContext} from "./stateManager/IngredientContext";
import MouseTracker from "./components/mouseTracker";
import {
    ingredientBackgroundColor,
    mainAppColor,
    navBarColor,
    pageSectionColor,
    randomTempColor,
    randomTempColor2,
    leftColumnColor, sectionItemColor
} from "./colors";
import './animations.css';


function App() {
    const [currentPage, setCurrentPage] = useState('defaultPage');
    const [key, setKey] = useState(0); // Add a key state
    const [selectedIngredientRef, setSelectedIngredientRef] = useState(null);  // Pretending this is like a 'fake' pointer
    const {selectedIngredients, unselectIngredient} = useIngredientContext();
    const [displayIngredient, setDisplayIngredient] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [leftColumnVisible, setLeftColumnVisible] = useState(true);
    const [comparisonVisible, setComparisonVisible] = useState(false);


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

    const handleToggleLeftColumn = () => {
        setLeftColumnVisible((prevVisible) => !prevVisible);
    };

    useEffect(() => {
        const handleResize = () => {
            // Check the window width and update left column visibility
            const isSmallScreen = window.innerWidth <= 810;
            setLeftColumnVisible(!isSmallScreen);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial check on mount
        handleResize();

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures that the effect runs only on mount and unmount

    const handleToggleComparison = () => {
        setComparisonVisible((prevVisible) => !prevVisible);
    }

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
                <div style={{backgroundColor: sectionItemColor, marginRight: '20%', position: 'fixed', left: 10,}}>
                    <button onClick={handleToggleLeftColumn} style={{height: '100%', width: '100%'}}>
                        {leftColumnVisible ? 'Hide Left Column' : 'Show Left Column'}
                    </button>
                </div>
                <div style={{backgroundColor: sectionItemColor, height: '80%', width: '40%', minWidth: '400px'}}>
                    <input
                        type="text"
                        placeholder="Search for ingredients..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        style={{width: '100%', height: '100%'}}
                    />
                </div>
            </div>
            <div className="main-layout"
                 style={{display: 'flex', flexGrow: 1, marginTop: '60px', position: 'relative', top: '3%',}}>
                <div className="left-column" style={{
                    flex: '1',
                    position: 'fixed',
                    // padding: '1%',
                    // width: '225px',
                    width: leftColumnVisible ? '225px' : '0',
                    height: '100%',
                    backgroundColor: leftColumnColor,
                    border: '1px solid #000',
                    boxSizing: 'border-box',
                    overflowY: 'auto',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                    // boxShadow: '4px 0 8px rgba(0, 0, 0, 0.5)',
                    transition: 'width 0.2s ease-in-out'
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
                    {/*<button onClick={handleToggleComparison}>Show Selected Ingredients</button>*/}
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

                <div className="main-content" style={{
                    flex: '1',
                    marginLeft: leftColumnVisible ? '225px' : '0',
                    overflow: 'auto',
                    transition: 'margin-left 0.2s ease-in-out'
                }}>
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
                {/*{comparisonVisible && (*/}
                {/*    <div style={{*/}
                {/*        position: 'fixed',*/}
                {/*        top: 0,*/}
                {/*        left: 0,*/}
                {/*        width: '80%',*/}
                {/*        // height: '100%',*/}
                {/*        backgroundColor: ingredientBackgroundColor,*/}
                {/*        zIndex: 1*/}
                {/*    }}>*/}
                {/*        <div style={{*/}
                {/*            backgroundColor: randomTempColor2,*/}
                {/*            height: '40px',*/}
                {/*            width: '80%',*/}
                {/*            position: 'fixed',*/}
                {/*            display: 'flex',*/}
                {/*            alignItems: 'center',*/}
                {/*            zIndex: 1,*/}
                {/*            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'*/}
                {/*        }}>*/}
                {/*            <button onClick={() => setComparisonVisible(false)} style={{marginLeft: '8px'}}>*/}
                {/*                Go Back*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <CompareIngredientsGlobal*/}
                {/*            ingredient1={selectedIngredients[0]}*/}
                {/*            ingredient2={selectedIngredients[1]}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </div>
    );
}

export default App;
