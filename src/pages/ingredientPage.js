import React, {useEffect, useState} from 'react';
import {useIngredientContext} from "../stateManager/IngredientContext";
import {randomTempColor} from "../colors";

const IngredientPage = ({ingredient}) => {
    const [ingredientData, setIngredientData] = useState(null);
    const [sharedMoleculeCounts, setSharedMoleculeCounts] = useState(null);
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
            // Fetch data using the existing route
            const response = await fetch(`http://localhost:5000/api/flavordb/${entity_id}`);
            const {data} = await response.json();

            if (data) {
                setIngredientData(data);
            } else {
                setErrorMessage('Ingredient not found');
            }

            // Fetch shared molecule counts using the new route
            const sharedMoleculeCountResponse = await fetch(`http://localhost:5000/api/get_ingredients/${entity_id}`);
            const {shared_molecule_count} = await sharedMoleculeCountResponse.json();

            if (shared_molecule_count) {
                // Sort entries by count in descending order
                const sortedEntries = Object.entries(shared_molecule_count).sort(([, countA], [, countB]) => countB - countA);
                setSharedMoleculeCounts(sortedEntries);
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
                    minHeight: '300px',
                    maxHeight: '70vh',
                    padding: '20px',
                    margin: '0 auto',
                    marginTop: '15vh',
                    borderRadius: '8px',
                    border: '1px solid #000',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    boxSizing: 'border-box',
                    overflow: 'hidden',  // Hide overflow for the entire container
                    backgroundColor: randomTempColor,
                    display: 'flex',  // Use flexbox to control child sections
                    flexDirection: 'column',  // Stack children vertically
                }}>
                    <div className="top-left-section" style={{
                        flex: '0 0 auto',  // Do not grow or shrink
                        // backgroundColor: 'yellow',
                        overflow: 'auto',  // Enable overflow for the yellow section
                    }}>
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
                    <h2>Ingredients With Shared Molecules</h2>
                    <div style={{
                        flex: '1 1 auto',  // Grow but don't shrink
                        overflowY: 'auto',  // Enable vertical overflow for the blue section
                        maxHeight: '100%',  // Limit the maximum height to enable scrolling
                        columns: '3',  // Number of columns you want
                        columnGap: '20px',  // Adjust the gap between columns
                        borderRadius: '8px',
                        border: '1px solid #000',
                    }}>
                        {sharedMoleculeCounts && (
                            <div className="shared-molecule-count">
                                <ul style={{listStyle: 'none', padding: 0, margin: 0, textAlign: 'left'}}>
                                    {sharedMoleculeCounts.map(([alias, count]) => (
                                        <li key={alias} style={{marginBottom: '10px'}}>
                                            <strong>{alias}:</strong> {count}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <button onClick={handleAddToComparison}>Add to Comparison</button>
        </div>
    );
};

export default IngredientPage;