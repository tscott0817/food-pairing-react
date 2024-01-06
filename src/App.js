import React, {useState, useEffect, useCallback, useRef} from 'react';
import './App.css';
import CompareIngredientsGlobal from "./pages/compareIngredientsGlobal";
import IngredientPage from "./pages/ingredientPage";
import DefaultPage from "./pages/defaultPage";
import {useIngredientContext} from "./stateManager/IngredientContext";
import MouseTracker from "./components/mouseTracker";
import IngredientThumbnail from "./components/cards/ingredientThumbnail";
import {FaTimes} from 'react-icons/fa';

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
    buttonColorArrow, selectionColor
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
    const [leftColumnVisible, setLeftColumnVisible] = useState(false);
    const [comparisonVisible, setComparisonVisible] = useState(false);  // TODO: For if I want to show the comparison as overlay instead of new page
    const comparisonContainerRef = useRef(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [isIngredientSelected, setIsIngredientSelected] = useState(false);

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
        // Update the isIngredientSelected state based on whether an ingredient is selected
        setIsIngredientSelected(selectedIngredients.length > 0);
    }, [selectedIngredients]);

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
            <div
                style={{
                    backgroundColor: navBarColor,
                    width: '100%',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'fixed',
                    zIndex: 1,
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    padding: '0 10px',
                }}
            >
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
                        padding: '8px',
                        boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                        margin: 'auto',
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
                            padding: '8px',
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
                <div style={{
                    display: 'flex',
                    transition: 'width 0.2s ease-in-out'
                }}>
                    <div className="left-column" style={{
                        flex: '1',
                        position: 'fixed',
                        width: '225px',
                        height: '100%',
                        backgroundColor: leftColumnColor,
                        boxSizing: 'border-box',
                        overflowY: 'auto',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                        transition: 'transform 0.2s ease-in-out', // Transition for moving left
                        transform: leftColumnVisible ? 'translateX(0)' : 'translateX(-225px)', // Use translateX for movement
                    }}>
                        <div style={{
                            backgroundColor: navBarColor,
                            position: 'fixed',
                            width: '225px',
                            overflow: 'hidden', // Hide content when width is '0'
                            // transition: 'width 0.3s ease', // Add transition effect for smoother animation
                            transition: 'width 0.2s ease-in-out', // Ensure the left column also has the transition
                            boxShadow: '0 4px 8px -4px rgba(0, 0, 0, 0.5)',
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                padding: '1%',
                                marginTop: '15px',
                            }}>

                                {/* First div */}
                                <div style={{
                                    position: 'relative',
                                    height: '75px',
                                    width: '30%',
                                    // transform: leftColumnVisible ? 'translateX(0)' : 'translateX(-100%)', // Move left offscreen
                                    backgroundColor: selectionColor,
                                    borderRadius: '8px',
                                    marginLeft: '25px',
                                    // transition: 'transform 0.3s ease', // Add transition effect
                                }}>
                                    {selectedIngredients.length > 0 && (
                                        <div style={{
                                            position: 'relative',
                                            height: '100%',
                                        }}>
                                            <div style={{
                                                position: 'relative',
                                                zIndex: 3,
                                                width: '50%',
                                                marginLeft: '90%'
                                            }}>
                                                <button
                                                    onClick={() => handleRemoveIngredient(0)}
                                                    style={{
                                                        backgroundColor: buttonBackgroundColor,
                                                        border: 'none',
                                                        cursor: 'pointer'
                                                    }}>
                                                    <FaTimes/>
                                                </button>
                                            </div>
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    zIndex: 2,
                                                }}
                                            >
                                                <IngredientThumbnail ingredient_name={selectedIngredients[0].alias}
                                                                     ingredient_id={selectedIngredients[0].entityID}
                                                                     font_size={'10px'}/>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Second div */}
                                <div style={{
                                    position: 'relative',
                                    height: '75px',
                                    width: '30%',
                                    // transform: leftColumnVisible ? 'translateX(0)' : 'translateX(-100%)', // Move left offscreen
                                    backgroundColor: selectionColor,
                                    borderRadius: '8px',
                                    marginLeft: '35px',
                                    // transition: 'transform 0.3s ease', // Add transition effect
                                }}>
                                    {selectedIngredients.length > 1 && (
                                        <div style={{
                                            position: 'relative',
                                            height: '100%',
                                        }}>
                                            <div style={{
                                                position: 'relative',
                                                zIndex: 3,
                                                width: '50%',
                                                marginLeft: '90%'
                                            }}>
                                                <button
                                                    onClick={() => handleRemoveIngredient(1)}
                                                    style={{
                                                        backgroundColor: buttonBackgroundColor,
                                                        border: 'none',
                                                        cursor: 'pointer'
                                                    }}>
                                                    <FaTimes/>
                                                </button>
                                            </div>
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    zIndex: 2,
                                                }}
                                            >
                                                <IngredientThumbnail ingredient_name={selectedIngredients[1].alias}
                                                                     ingredient_id={selectedIngredients[1].entityID}
                                                                     font_size={'10px'}/>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>

                            {/* Compare Ingredients button */}
                            <div style={{position: 'relative', padding: '1%'}}>
                                <button onClick={handleShowSelectedIngredients}
                                        style={{
                                            whiteSpace: 'pre-line',
                                            width: '90%',
                                            marginTop: '5%',
                                            marginBottom: '5%'
                                        }}>
                                    Compare<br/>Ingredients
                                </button>
                            </div>
                        </div>
                        {/* Search Filters */}
                        <div style={{
                            // transition: 'transform 0.3s ease',
                            // transform: leftColumnVisible ? 'translateX(0)' : 'translateX(-100%)', // Move left offscreen
                            overflow: 'hidden', // Hide content when width is '0'
                        }}>
                            <h3 style={{marginTop: '160px'}}>Search Filters</h3>
                            <ul>
                                <li>Filter 1</li>
                                <li>Filter 2</li>
                                <li>Filter 3</li>
                                <li>Filter 4</li>
                                <li>Filter 5</li>
                            </ul>
                        </div>
                    </div>
                    <div style={{
                        // backgroundColor: 'red',
                        height: '100%',
                        // width: '37.5px',
                        width: '3%',
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
                                    marginRight: '100%',
                                    left: 0,
                                    backgroundColor: buttonBackgroundColor,
                                    borderRadius: '50px',
                                    border: 'none',
                                    color: buttonColorArrow,
                                    cursor: 'pointer',
                                }}>
                            {leftColumnVisible ? <FaChevronLeft size={'20px'}/> : <FaChevronRight size={'20px'}/>}
                        </button>
                    </div>
                </div>

                <div className="main-content" style={{
                    flex: '1',
                    // marginLeft: leftColumnVisible ? '237.5px' : '12.5px',
                    marginLeft: leftColumnVisible ? '250px' : '25px',
                    marginTop: '8px',
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
                        // transform: 'translate(-50%, -50%)',
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
