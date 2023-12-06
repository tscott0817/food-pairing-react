import React, {useState, useEffect} from 'react';
import './App.css';
import SearchByName from './pages/searchByName';
import CompareIngredients from './pages/compareIngredients';
import SearchByCategory from "./pages/searchByCategory";
import MouseTracker from './components/mouseTracker';
import IngredientPage from "./pages/ingredientPage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DefaultPage from "./pages/defaultPage";


function App() {
    const [currentPage, setCurrentPage] = useState('defaultPage');

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="App" style={{display: 'flex', flexDirection: 'column'}}>
            {/* Navigation Bar */}
            <div className="navigation-bar" style={{ padding: '1%', backgroundColor: '#f0f0f0', width: '100%', display: 'flex', position: 'fixed', justifyContent: 'space-around', zIndex: 1 }}>
                <button onClick={() => handlePageChange('defaultPage')}>Default Page</button>
                <button onClick={() => handlePageChange('compareIngredients')}>Compare Ingredients</button>
                <button onClick={() => handlePageChange('searchByName')}>Search By Name</button>
                <button onClick={() => handlePageChange('searchByCategory')}>Search By Category</button>
                <button onClick={() => handlePageChange('ingredientPage')}>Ingredient Page</button>
            </div>


            <div className="main-layout"
                 style={{backgroundColor: 'red', display: 'flex', flexGrow: 1, marginTop: '3%', position: 'relative', top: '3%'}}>
                {/* Left Column - Search Filters */}
                <div className="left-column"
                     style={{flex: '1', position: 'fixed', padding: '1%', width: '10%', height: '100vh', backgroundColor: '#e0e0e0'}}>
                    {/* Include your search filters component here */}
                    <h3>Search Filters</h3>
                    <ul>
                        <li>Filter 1</li>
                        <li>Filter 2</li>
                        {/* Add more filters as needed */}
                    </ul>
                </div>

                {/* Main Content based on currentPage */}
                <div className="main-content" style={{flex: '1', marginLeft: '10%'}}>
                    {currentPage === 'defaultPage' && <DefaultPage/>}
                    {currentPage === 'compareIngredients' && <CompareIngredients/>}
                    {currentPage === 'searchByName' && <SearchByName/>}
                    {currentPage === 'searchByCategory' && <SearchByCategory/>}
                    {currentPage === 'ingredientPage' && <IngredientPage/>}
                </div>
            </div>

            {/*/!* Main Content Layout *!/*/}
            {/*<div className="main-layout" style={{display: 'flex', flexGrow: 1, marginTop: '3%'}}>*/}
            {/*    /!* Left Column - Search Filters *!/*/}
            {/*    <div className="left-column" style={{flex: '0 0 200px', position: 'fixed', padding: '10px', backgroundColor: '#e0e0e0'}}>*/}
            {/*        /!* Include your search filters component here *!/*/}
            {/*        <h3>Search Filters</h3>*/}
            {/*        <ul>*/}
            {/*            <li>Filter 1</li>*/}
            {/*            <li>Filter 2</li>*/}
            {/*            /!* Add more filters as needed *!/*/}
            {/*        </ul>*/}
            {/*    </div>*/}

            {/*    /!* Main Content based on currentPage *!/*/}
            {/*    <div className="main-content" style={{flex: '1'}}>*/}
            {/*        {currentPage === 'defaultPage' && <DefaultPage/>}*/}
            {/*        {currentPage === 'compareIngredients' && <CompareIngredients/>}*/}
            {/*        {currentPage === 'searchByName' && <SearchByName/>}*/}
            {/*        {currentPage === 'searchByCategory' && <SearchByCategory/>}*/}
            {/*        {currentPage === 'ingredientPage' && <IngredientPage/>}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}


// function App() {
//     const [currentPage, setCurrentPage] = useState('defaultPage');
//
//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };
//
//     return (
//         <div className="App">
//             <button onClick={() => handlePageChange('defaultPage')}>
//                 Default Page
//             </button>
//             <button onClick={() => handlePageChange('compareIngredients')}>
//                 Compare Ingredients
//             </button>
//             <button onClick={() => handlePageChange('searchByName')}>
//                 Search By Name
//             </button>
//             <button onClick={() => handlePageChange('searchByCategory')}>
//                 Search By Category
//             </button>
//             <button onClick={() => handlePageChange('ingredientPage')}>
//                 Ingredient Page
//             </button>
//             {/*<MouseTracker />*/}
//
//
//             {currentPage === 'defaultPage' && <DefaultPage />}
//             {currentPage === 'compareIngredients' && <CompareIngredients />}
//             {currentPage === 'searchByName' && <SearchByName />}
//             {currentPage === 'searchByCategory' && <SearchByCategory />}
//             {currentPage === 'ingredientPage' && <IngredientPage />}
//         </div>
//     );
// }

export default App;
