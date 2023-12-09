import React, {useEffect, useState} from "react";
import IngredientThumbnail from "../components/cards/ingredientThumbnail";
import {mainAppColor, pageColor, randomTempColor} from "../colors";


const DefaultPage = ({setSelectedIngredientRef, handlePageChange, handleDisplayIngredient}) => {
    const [flavors, setFlavors] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/flavordb')
            .then(response => response.json())
            .then(data => {
                const sortedFlavors = data.data.sort((a, b) =>
                    a.alias.localeCompare(b.alias)
                );
                setFlavors(sortedFlavors);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleThumbnailClick = (ingredient) => {
        setSelectedIngredientRef({current: ingredient});
        // handlePageChange('ingredientPage');
        handleDisplayIngredient(true);
    };

    const handleGoBack = () => {
        setSelectedIngredient(null);
    };

    const handleSearchInputChange = event => {
        setSearchQuery(event.target.value);
    };

    const filteredFlavors = flavors.filter(flavor =>
        flavor.alias.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{backgroundColor: pageColor}}>
            <div style={{
                backgroundColor: randomTempColor,
                width: '100%',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                zIndex: 1
            }}>
                <input
                    type="text"
                    placeholder="Search for ingredients..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    style={{width: '40%', minWidth: '400px', height: '80%', marginRight: '200px'}}
                />
            </div>
            {/*<div style={{backgroundColor: '#ff9cf0', width: '100%', display: 'flex', flexWrap: 'wrap'}}>*/}
            <div style={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>
                {filteredFlavors.map(flavor => (
                    <div
                        key={flavor.index}
                        // style={{flex: '0 0 auto', margin: '5px', cursor: 'pointer', width: '20%', height: '20%'}}
                        style={{flex: '0 0 auto', margin: '5px', cursor: 'pointer', width: '200px', height: '200px'}}
                        onClick={() => handleThumbnailClick(flavor)}
                    >
                        <IngredientThumbnail ingredient={flavor}/>
                    </div>
                ))}
            </div>
            {/*{selectedIngredient && (*/}
            {/*    <button onClick={handleGoBack}>Go Back to Ingredient List</button>*/}
            {/*)}*/}
        </div>
    );
};

export default DefaultPage;