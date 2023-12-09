import React, {useEffect, useState} from "react";
import IngredientThumbnail from "../components/cards/ingredientThumbnail";
import {mainAppColor, pageColor, pageSectionColor, randomTempColor, sectionItemColor} from "../colors";


const DefaultPage = ({setSelectedIngredientRef, handleDisplayIngredient, searchQuery}) => {
    const [flavors, setFlavors] = useState([]);

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
        handleDisplayIngredient(true);
    };

    const filteredFlavors = flavors.filter(flavor =>
        flavor.alias.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{backgroundColor: pageColor, minWidth: '800px'}}>
            <div style={{width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', padding: '1%', backgroundColor: pageSectionColor}}>
                {filteredFlavors.map(flavor => (
                    <div
                        key={flavor.index}
                        style={{
                            flex: '1 0 23%', // flex-grow: 1 to allow items to grow, 0 flex-shrink, 23% flex-basis
                            margin: '1%',
                            cursor: 'pointer',
                            minWidth: '250px',
                            height: '40vh',
                            minHeight: '275px',
                            // backgroundColor: sectionItemColor,
                        }}
                        onClick={() => handleThumbnailClick(flavor)}
                    >
                        <IngredientThumbnail ingredient={flavor}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DefaultPage;