import React, {useState, useEffect, useCallback, useRef} from 'react';
import './App.css';
import CompareIngredientsGlobal from "./pages/compareIngredientsGlobal";
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
    leftColumnColor,
    sectionItemColor,
    buttonBackgroundColor,
    defaultPageNeonColor,
    searchBarColor,
    buttonColorArrow
} from "./colors";
import './animations.css';
import {FaBars, FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import {FaSearch} from 'react-icons/fa';

function App() {
    const [currentPage, setCurrentPage] = useState('defaultPage');
    const [key, setKey] = useState(0); // Add a key state
    const [selectedIngredientRef, setSelectedIngredientRef] = useState(null);  // Pretending this is like a pointer
    const {selectedIngredients, unselectIngredient} = useIngredientContext();
    const [displayIngredient, setDisplayIngredient] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [leftColumnVisible, setLeftColumnVisible] = useState(true);
    const [comparisonVisible, setComparisonVisible] = useState(false);  // TODO: For if I want to show the comparison as overlay instead of new page
    const comparisonContainerRef = useRef(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');

    // TODO: Apparently callback better? Not sure why, see if need to implement for other functions
    const handleDisplayIngredient = useCallback((displayIngredient) => {
        setDisplayIngredient(displayIngredient);
    }, [setDisplayIngredient]);

    const handlePageChange = useCallback((page) => {
        setKey((prevKey) => prevKey + 1);
        setCurrentPage(page);
        handleDisplayIngredient(false);
    }, [setKey, setCurrentPage, handleDisplayIngredient]);

    // TODO: Decide whether to use overlay or page change
    const handleShowSelectedIngredients = () => {
        // console.log('Selected Ingredients:', selectedIngredients);
        // handlePageChange('compareIngredientsGlobal');  // TODO: Only need if using page change instead of overlay
        // handleToggleLeftColumn();
        setComparisonVisible(true);
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

    const handleToggleComparison = () => {
        setComparisonVisible((prevVisible) => !prevVisible);
    }

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

    useEffect(() => {
        // Conditionally set the body overflow based on the comparisonVisible state
        if (comparisonVisible || displayIngredient) {
            disableScroll();
        } else {
            enableScroll();
        }

        // Cleanup function to revert changes on component unmount
        return () => {
            enableScroll();
        };
    }, [comparisonVisible, displayIngredient]);

    // New function to handle selecting a filter
    const handleFilterSelect = (filter) => {
        // Toggle the selected filter
        setSelectedFilter((prevFilter) => (prevFilter === filter ? '' : filter));
    };


    const disableScroll = () => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
    };


    return (
        <div key={key} className="App"
             style={{display: 'flex', flexDirection: 'column', backgroundColor: mainAppColor}}>
            <div style={{
                backgroundColor: navBarColor,
                width: '100%',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',  // Use space-between to push elements to the ends
                position: 'fixed',
                zIndex: 1,
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                padding: '0 10px',  // Add padding to the ends for spacing
            }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '25px',
                        overflow: 'hidden',
                        backgroundColor: searchBarColor,
                        height: '80%',
                        width: '40%',
                        minWidth: '400px',
                        padding: '8px', // Adjust padding as needed
                        boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                        margin: 'auto', // Center the search bar horizontally
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search for ingredients..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        style={{
                            border: 'none',
                            outline: 'none',
                            padding: '8px', // Adjust padding as needed
                            flex: '1',
                            borderRadius: '25px',
                        }}
                    />
                    <FaSearch
                        style={{
                            marginLeft: '10px',
                            color: '#555',
                        }}
                    />
                </div>
            </div>
            <div className="main-layout"
                 style={{display: 'flex', flexGrow: 1, marginTop: '60px', position: 'relative', top: '3%',}}>
                <div style={{display: 'flex', transition: 'width 0.2s ease-in-out'}}>
                    <div className="left-column" style={{
                        flex: '1',
                        position: 'fixed',
                        width: leftColumnVisible ? '225px' : '0',
                        height: '100%',
                        backgroundColor: leftColumnColor,
                        boxSizing: 'border-box',
                        overflowY: 'auto',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                        transition: 'width 0.2s ease-in-out', // Ensure the left column also has the transition
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
                    <div style={{
                        // backgroundColor: 'red',
                        height: '100%',
                        width: '37.5px',
                        marginLeft: leftColumnVisible ? '225px' : '0', // Update marginLeft based on left column width
                        position: 'fixed',
                        zIndex: 1,
                        transition: 'margin-left 0.2s ease-in-out', // Adjust transition duration and timing function
                    }}>
                        <button onClick={handleToggleLeftColumn}
                                style={{
                                    height: '30px',
                                    width: '30px',
                                    marginTop: '44vh',
                                    backgroundColor: buttonBackgroundColor,
                                    borderRadius: '50px',
                                    border: 'none',
                                    color: buttonColorArrow,
                                }}>
                            {leftColumnVisible ? <FaChevronLeft size={'20px'}/> : <FaChevronRight size={'20px'}/>}
                        </button>
                    </div>
                </div>

                <div className="main-content" style={{
                    flex: '1',
                    marginLeft: leftColumnVisible ? '237.5px' : '12.5px',
                    overflow: 'auto',
                    transition: 'margin-left 0.2s ease-in-out'
                }}>
                    {currentPage === 'defaultPage' && <DefaultPage setSelectedIngredientRef={setSelectedIngredientRef}
                                                                   handleDisplayIngredient={handleDisplayIngredient}
                                                                   searchQuery={searchQuery}
                                                                   selectedFilters={selectedFilters}/>}
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

                {/*TODO: FOR IF I WANT TO SHOW THE COMPARISON AS OVERLAY*/}
                {comparisonVisible && (
                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        backgroundColor: ingredientBackgroundColor,
                        zIndex: 1,
                        // overflowY: 'auto', // Add this line to enable scrolling
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                        // onClick={() => setComparisonVisible(false)}  // Close comparison when clicking on the background overlay
                    >
                        <div style={{width: '75%', height: '95%'}}>
                            <CompareIngredientsGlobal
                                ingredient1={selectedIngredients[0]}
                                ingredient2={selectedIngredients[1]}
                            />
                        </div>
                        <button onClick={() => setComparisonVisible(false)} style={{marginLeft: '8px'}}>
                            Go Back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
