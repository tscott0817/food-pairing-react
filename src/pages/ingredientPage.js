import React, { useEffect, useState } from 'react';
import { useIngredientContext } from "../stateManager/IngredientContext";
import { randomTempColor } from "../colors";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import CollapsibleComponent from '../components/collapsibleComponent';

const IngredientPage = ({ ingredient }) => {
    const [ingredientData, setIngredientData] = useState(null);
    const [sharedMoleculeCounts, setSharedMoleculeCounts] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { selectedIngredients, selectIngredient, unselectIngredient } = useIngredientContext();
    const [isSuggestedCardCollapsed, setSuggestedCardCollapsed] = useState(true);

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
            const { data } = await response.json();

            if (data) {
                setIngredientData(data);
            } else {
                setErrorMessage('Ingredient not found');
            }

            const sharedMoleculeCountResponse = await fetch(`http://localhost:5000/api/get_ingredients/${entity_id}`);
            const { shared_molecule_count } = await sharedMoleculeCountResponse.json();

            if (shared_molecule_count) {
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
                    height: '70vh',
                    minHeight: '300px',
                    maxHeight: '70vh',
                    padding: '20px',
                    margin: '0 auto',
                    marginTop: '15vh',
                    borderRadius: '8px',
                    border: '1px solid #000',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    backgroundColor: randomTempColor,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div className="top-left-section" style={{
                        flex: '0 0 auto',
                        overflow: 'auto',
                    }}>
                        <div className="alias" style={{ fontWeight: 'bold', fontSize: '1.5em', marginBottom: '10px' }}>
                            {ingredientData.alias.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </div>
                        <div className="scientific-name" style={{ fontSize: '0.8em', color: '#555' }}>
                            Scientific Name: {ingredientData.scientificName}
                        </div>
                        <div className="category" style={{ fontSize: '0.8em', color: '#555' }}>
                            Category: {ingredientData.category}
                        </div>
                        <div className="molecules" style={{ fontSize: '0.8em', color: '#555' }}>
                            Molecules: {ingredientData.molecules}
                        </div>
                    </div>
                    <hr className="separator" style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ccc' }} />
                    <CollapsibleComponent
                        title="Ingredients With Shared Molecules"
                        isCollapsed={isSuggestedCardCollapsed}
                        onToggle={() => setSuggestedCardCollapsed(!isSuggestedCardCollapsed)}
                    >
                        <div style={{ maxHeight: '25vh', overflowY: 'auto' }}>
                            <div style={{ columns: '3', columnGap: '20px' }}>
                                {sharedMoleculeCounts && sharedMoleculeCounts.map(([alias, count]) => (
                                    <div key={alias} style={{ marginBottom: '10px' }}>
                                        <strong>{alias}:</strong> {count}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CollapsibleComponent>
                </div>
            )}
            <button onClick={handleAddToComparison}>Add to Comparison</button>
        </div>
    );
};

export default IngredientPage;
