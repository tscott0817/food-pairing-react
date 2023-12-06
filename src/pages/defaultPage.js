import React, {useEffect, useState} from "react";
import IngredientThumbnail from "../components/cards/ingredientThumbnail";
import IngredientPage from "./ingredientPage";

const DefaultPage = () => {
    const [flavors, setFlavors] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    useEffect(() => {
        // Fetch data from your Flask API
        fetch('http://localhost:5000/api/flavordb')
            .then(response => response.json())
            .then(data => {
                // Sort data alphabetically based on the 'alias' column
                const sortedFlavors = data.data.sort((a, b) =>
                    a.alias.localeCompare(b.alias)
                );
                setFlavors(sortedFlavors);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array means this effect runs once after the initial render

    const handleThumbnailClick = (ingredient) => {
        setSelectedIngredient(ingredient);
    };

    const handleGoBack = () => {
        // Reset the selectedIngredient state to go back to the list of ingredients
        setSelectedIngredient(null);
    };

    return (
        <div>
            <h2>Ingredient List</h2>
            {selectedIngredient ? (
                <IngredientPage ingredient={selectedIngredient}/>
            ) : (
                <div style={{backgroundColor: "pink", width: "98%", display: 'flex', flexWrap: 'wrap', margin: "1%"}}>
                    {flavors.map(flavor => (
                        <div key={flavor.index} style={{flex: '0 0 auto', margin: '5px'}}
                             onClick={() => handleThumbnailClick(flavor)}>
                            <IngredientThumbnail ingredient={flavor}/>
                        </div>
                    ))}
                </div>
            )}
            {/* TODO: This needs to be ONLY on ingredient page, not on thumbnails */}
            <button onClick={handleGoBack}>Go Back to Ingredient List</button>
        </div>
    );
};

export default DefaultPage;