import React, {useEffect, useState} from 'react';
import {useIngredientContext} from "../stateManager/IngredientContext";
import {pageColor, randomTempColor} from "../colors";
import {FaArrowDown, FaArrowRight} from "react-icons/fa";
import CollapsibleComponent from '../components/collapsibleComponent';
import SharedMoleculesCardSingle from "../components/cards/sharedMoleculeCardSingle";
import MoleculesCard from "../components/cards/moleculesCard";

const IngredientPage = ({ingredient}) => {
    const [ingredientData, setIngredientData] = useState(null);
    const [sharedMoleculeCounts, setSharedMoleculeCounts] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const {selectedIngredients, selectIngredient, unselectIngredient} = useIngredientContext();
    const [isSuggestedCardCollapsed, setSuggestedCardCollapsed] = useState(true);
    const [isMoleculeCardCollapsed, setMoleculeCardCollapsed] = useState(true);
    const [allMolecules, setAllMolecules] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);

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

            const allMoleculesResponse = await fetch(`http://localhost:5000/api/flavordb/ingredient-molecules/${entity_id}`);
            const all_molecules = await allMoleculesResponse.json();
            console.log('all_molecules:', all_molecules);
            if (all_molecules) {
                setAllMolecules(all_molecules);
            } else {
                setErrorMessage('Ingredient not found');
            }

            const sharedMoleculeCountResponse = await fetch(`http://localhost:5000/api/get_ingredients/${entity_id}`);
            const {shared_molecule_count} = await sharedMoleculeCountResponse.json();

            if (shared_molecule_count) {
                const sortedEntries = Object.entries(shared_molecule_count).sort(([, countA], [, countB]) => countB - countA);
                setSharedMoleculeCounts(sortedEntries);
            }

        } catch (error) {
            console.error('Error fetching or parsing data:', error);
            setErrorMessage('Error fetching data');
        }
        setFadeIn(true);
    };

    return (
        <div style={{
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: pageColor,
            width: '100%',
            // minWidth: '900px', // TODO: Make this a proportion of the users screen size instead of hardcoding
            height: '100%',
            margin: '0 auto',
            padding: '20px',
            paddingTop: '20px',
            borderRadius: '8px',
            // border: '1px solid #000',
            // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            overflowY: 'auto',
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity .5s ease-in-out',
        }}>
            {errorMessage && <p>{errorMessage}</p>}
            {ingredientData && (
                <div style={{
                    opacity: fadeIn ? 1 : 0,
                    transition: 'opacity .5s ease-in-out',
                    width: '100%',
                    height: '100%',
                    marginTop: '2%',
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
                    <button onClick={handleAddToComparison}>Add to Comparison</button>
                    <hr className="separator" style={{margin: '20px 0', border: 'none', borderTop: '1px solid #ccc'}}/>
                    <CollapsibleComponent
                        title="Molecules"
                        isCollapsed={isMoleculeCardCollapsed}
                        onToggle={() => setMoleculeCardCollapsed(!isMoleculeCardCollapsed)}
                    >
                        <MoleculesCard ingredientName={"Temp"} moleculeData={allMolecules}/>
                    </CollapsibleComponent>
                    <CollapsibleComponent
                        title="Ingredients With Shared Molecules"
                        isCollapsed={isSuggestedCardCollapsed}
                        onToggle={() => setSuggestedCardCollapsed(!isSuggestedCardCollapsed)}
                    >
                        <div style={{maxHeight: '40vh', overflowY: 'auto'}}>
                            <div style={{columns: '3', columnGap: '20px'}}>
                                {sharedMoleculeCounts && sharedMoleculeCounts.map(([alias, count]) => (
                                    <div key={alias} style={{marginBottom: '10px'}}>
                                        <strong>{alias}:</strong> {count}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CollapsibleComponent>
                </div>
            )}
            {/*<button onClick={handleAddToComparison}>Add to Comparison</button>*/}
        </div>
    );
};

export default IngredientPage;
