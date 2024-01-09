import React, {useEffect, useState} from 'react';
import {useIngredientContext} from "../stateManager/IngredientContext";
import {pageColor, randomTempColor} from "../colors";
import {FaArrowDown, FaArrowRight} from "react-icons/fa";
import CollapsibleComponent from '../components/collapsibleComponent';
import SharedMoleculesCardSingle from "../components/cards/sharedMoleculeCardSingle";
import MoleculesCard from "../components/cards/moleculesCard";
import SimilarIngredientsCard from "../components/cards/similarIngredientsCard";
import {FaPlus} from 'react-icons/fa';

const IngredientPage = ({ingredient}) => {
    const imageURL = `https://cosylab.iiitd.edu.in/flavordb/static/entities_images/${ingredient.entityID}.jpg`;
    const [ingredientData, setIngredientData] = useState(null);
    const [sharedMoleculeCounts, setSharedMoleculeCounts] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const {selectedIngredients, selectIngredient, unselectIngredient} = useIngredientContext();
    const [isSuggestedCardCollapsed, setSuggestedCardCollapsed] = useState(true);
    const [isMoleculeCardCollapsed, setMoleculeCardCollapsed] = useState(true);
    const [isFlavorCardCollapsed, setFlavorCardCollapsed] = useState(true);
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
            // backgroundColor: 'blue',
            width: '100%',
            height: '100%',
            margin: '0 auto',
            // padding: '20px',
            // paddingTop: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderRadius: '8px',
            // overflowY: 'auto',
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity .3s ease-in-out',
        }}>
            {errorMessage && <p>{errorMessage}</p>}
            {ingredientData && (
                <div style={{
                    opacity: fadeIn ? 1 : 0,
                    transition: 'opacity .5s ease-in-out',
                    width: '100%',
                    height: '100%',
                    overflowY: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row', // Stack items vertically
                        // backgroundColor: 'red',
                        justifyContent: 'center',
                        // paddingBottom: '1%',
                        // boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                    }}>
                        {/* Image on the left */}
                        <div style={{
                            // marginLeft: '30%',
                            // backgroundColor: 'pink',
                            width: '75px',
                            height: '75px',
                        }}>
                            <img
                                src={imageURL}
                                alt={`Ingredient ${ingredient.alias}`}
                                style={{
                                    width: '100%', // Adjust the width as needed
                                    height: '100%', // Adjust the height as needed
                                    marginTop: '10%',
                                    objectFit: 'cover', // Maintain aspect ratio
                                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                                    // borderRadius: '8px',
                                    // borderRadius: '8px 8px 0 0',
                                }}
                            />
                        </div>

                        {/* Data in the middle */}
                        <div style={{
                            // flex: 1,
                            textAlign: 'center',
                            marginTop: '1%',
                            marginBottom: '1%',
                            marginLeft: '5%',
                            marginRight: '5%',
                            // backgroundColor: 'blue',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <div className="alias" style={{
                                fontWeight: 'bold',
                                fontSize: '1.5em',
                                marginBottom: '5%',
                                // backgroundColor: 'yellow',
                                // width: '50%'
                            }}>
                                {ingredientData.alias.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </div>
                            <div className="scientific-name" style={{
                                fontSize: '0.8em',
                                color: '#555',
                                // backgroundColor: 'yellow',
                                // width: '50%'
                            }}>
                                Scientific Name: {ingredientData.scientificName}
                            </div>
                            <div className="category" style={{
                                fontSize: '0.8em',
                                color: '#555',
                                // backgroundColor: 'yellow',
                                // width: '50%'
                            }}>
                                Category: {ingredientData.category}
                            </div>
                        </div>
                        <div
                            style={{
                                // marginRight: '30%',
                                // backgroundColor: 'green',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <button
                                onClick={handleAddToComparison}
                                style={{
                                    margin: '1%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px', // Set the width for a circle
                                    height: '40px', // Set the height for a circle
                                    borderRadius: '50%', // Make it circular
                                    backgroundColor: 'blue', // Add your desired background color
                                    color: 'white', // Set the text color
                                    border: 'none', // Remove border for a cleaner look
                                    cursor: 'pointer', // Change cursor on hover
                                }}
                            >
                                <FaPlus/>
                            </button>
                        </div>
                    </div>

                    {/* Separator at the bottom */}
                    <hr
                        className="separator"
                        style={{
                            // margin: '10px 0',
                            border: 'none',
                            borderTop: '1px solid #ccc',
                            width: '100%',
                        }}
                    />
                    <div style={{
                        // backgroundColor: 'yellow',
                        padding: '1%',
                        paddingTop: '2%',
                        overflow: 'auto',
                    }}>
                        <CollapsibleComponent
                            title="Molecules"
                            isCollapsed={isMoleculeCardCollapsed}
                            onToggle={() => setMoleculeCardCollapsed(!isMoleculeCardCollapsed)}
                        >
                            <MoleculesCard ingredientName={"Temp"} moleculeData={allMolecules}/>
                        </CollapsibleComponent>
                        <CollapsibleComponent
                            title="Flavor Profiles"
                            isCollapsed={isFlavorCardCollapsed}
                            onToggle={() => setFlavorCardCollapsed(!isFlavorCardCollapsed)}
                        >
                            Flavor Card Goes Here
                        </CollapsibleComponent>
                        <CollapsibleComponent
                            title="Ingredients With Shared Molecules (Name: Count)"
                            isCollapsed={isSuggestedCardCollapsed}
                            onToggle={() => setSuggestedCardCollapsed(!isSuggestedCardCollapsed)}
                        >
                            <SimilarIngredientsCard sharedMoleculeCounts={sharedMoleculeCounts}/>
                        </CollapsibleComponent>
                    </div>
                </div>
            )}
        </div>
    );

};

export default IngredientPage;
