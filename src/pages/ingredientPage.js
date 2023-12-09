import React, {useEffect, useState} from 'react';
import {useIngredientContext} from "../stateManager/IngredientContext";
import {randomTempColor} from "../colors";



const IngredientCard = ({ingredient}) => {
    const [ingredientData, setIngredientData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const {selectedIngredients, selectIngredient, unselectIngredient} = useIngredientContext();

    useEffect(() => {
        if (ingredient) {
            fetchIngredientData();
        }

    }, [ingredient]);

    const handleSelect = (ingredient) => {
        selectIngredient(ingredient);
    };

    const handleUnselect = (ingredient) => {
        unselectIngredient(ingredient);
    };

    const handleAddToComparison = () => {
        if (!selectedIngredients.includes(ingredient)) {
            selectIngredient(ingredient);
        }
    };

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
                <div style={{
                    width: '50%',
                    height: '100%',
                    padding: '20px',
                    margin: '0 auto',
                    marginTop: '15vh',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: randomTempColor
                }}>
                    <div className="top-left-section" style={{display: 'flex', flexDirection: 'column'}}>
                        <div className="alias" style={{fontWeight: 'bold', fontSize: '1.5em', marginBottom: '10px'}}>
                            {ingredientData.alias.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </div>
                        <div className="scientific-name" style={{fontSize: '0.8em', color: '#555'}}>
                            Scientific Name: {ingredientData.scientificName}
                        </div>
                        <div className="category" style={{fontSize: '0.8em', color: '#555'}}>
                            Category: {ingredientData.category}
                        </div>
                        <div className="molecules" style={{fontSize: '0.8em', color: '#555'}}>
                            Molecules: {ingredientData.molecules}
                        </div>
                    </div>
                    <hr className="separator" style={{margin: '20px 0', border: 'none', borderTop: '1px solid #ccc'}}/>
                </div>
            )}
            <button onClick={handleAddToComparison}>Add to Comparison</button>
        </div>
    );

};

export default IngredientCard;