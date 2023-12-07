import React, {useEffect, useState} from "react";
import IngredientThumbnail from "../components/cards/ingredientThumbnail";
import IngredientCard from "../components/cards/ingredientCard";


const DefaultPage = ({ setSelectedIngredientRef, handlePageChange }) => {
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
        setSelectedIngredientRef({ current: ingredient });
        // Change the currentPage after setting the selected ingredient
        handlePageChange('ingredientPage');
    };

    const handleGoBack = () => {
        setSelectedIngredient(null);
    };

    const handleSearchInputChange = event => {
        setSearchQuery(event.target.value);
    };

    // Filter flavors based on the search query
    const filteredFlavors = flavors.filter(flavor =>
        flavor.alias.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Ingredient List</h2>
            <input
                type="text"
                placeholder="Search for ingredients..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                style = {{margin: '1%'}}
            />
                <div style={{ backgroundColor: '#ff9cf0', width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                    {filteredFlavors.map(flavor => (
                        <div
                            key={flavor.index}
                            style={{ flex: '0 0 auto', margin: '5px' }}
                            onClick={() => handleThumbnailClick(flavor)}
                        >
                            <IngredientThumbnail ingredient={flavor} />
                        </div>
                    ))}
                </div>
            {selectedIngredient && (
                <button onClick={handleGoBack}>Go Back to Ingredient List</button>
            )}
        </div>
    );
};

export default DefaultPage;