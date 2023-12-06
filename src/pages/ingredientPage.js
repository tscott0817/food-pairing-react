import React, {useEffect, useState} from 'react';
import './css/IngredientPage.css';

const IngredientPage = ({ingredient}) => {
    const [ingredientData, setIngredientData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Moved the conditional check to useEffect
    useEffect(() => {
        if (ingredient) {
            fetchIngredientData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredient]); // Include ingredient in the dependency array

    // const handleGoBack = () => {
    //     // Reset the selectedIngredient state to go back to the list of ingredients
    //     setIngredientData(null);
    // };

    const fetchIngredientData = async () => {
        const entity_id = ingredient.entityID;

        try {
            const response = await fetch(`http://localhost:5000/api/flavordb/${entity_id}`);
            const {data} = await response.json();

            if (data) {
                setIngredientData(data);
            } else {
                setErrorMessage('Ingredient not found');
            }
        } catch (error) {
            console.error('Error fetching or parsing data:', error);
            setErrorMessage('Error fetching data');
        }
    };

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            {ingredientData && (
                <div className="ingredient-container">
                    <div className="top-left-section">
                        <div className="alias">{ingredientData.alias}</div>
                        <div className="scientific-name">Category: {ingredientData.scientificName}</div>
                    </div>

                    <hr className="separator"/>

                    <div className="property-section">
                        <div className="property">
                            <span className="property-label">Category:</span> {ingredientData.category}
                        </div>

                        <div className="property">
                            <span className="property-label">Entity ID:</span> {ingredientData.entityID}
                        </div>

                        <div className="property">
                            <span className="property-label">Index:</span> {ingredientData.index}
                        </div>

                        <div className="property">
                            <span className="property-label">Molecules:</span> {ingredientData.molecules}
                        </div>

                        <div className="property">
                            <span className="property-label">Synonyms:</span> {ingredientData.synonyms}
                        </div>
                    </div>
                </div>
            )}
            {/*/!* Back button *!/*/}
            {/*<button onClick={handleGoBack}>Go Back to Ingredient List</button>*/}
        </div>
    );
};

export default IngredientPage;