import React, {useEffect, useState, useCallback} from 'react';

const IngredientCard = ({ingredient}) => {
    const [ingredientData, setIngredientData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchIngredientData = useCallback(async () => {
        if (ingredient) {
            const entity_id = ingredient.entityID;

            try {
                const response = await fetch(`http://localhost:5000/api/flavordb/${entity_id}`);
                const {data} = await response.json();

                if (data) {
                    console.log(data)
                    setIngredientData(data);
                } else {
                    setErrorMessage('Ingredient not found');
                }
            } catch (error) {
                console.error('Error fetching or parsing data:', error);
                setErrorMessage('Error fetching data');
            }
        }
    }, [ingredient]);

    useEffect(() => {
        fetchIngredientData();
    }, [ingredient, fetchIngredientData]);

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            {ingredientData && (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: '20px',
                        borderRadius: '8px',
                    }}
                >
                    <div
                        className="top-left-section"
                        style={{display: 'flex', flexDirection: 'column'}}
                    >
                        <div
                            className="alias"
                            style={{
                                fontWeight: 'bold',
                                fontSize: '1.5vw', // Use vw or vh for responsive font size
                                marginBottom: '10px',
                            }}
                        >
                            {ingredientData.alias
                                .split(' ')
                                .map(
                                    (word) =>
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(' ')}
                        </div>
                        <div
                            className="scientific-name"
                            style={{fontSize: '0.8vw', color: '#555'}}
                        >
                            Scientific Name: {ingredientData.scientificName}
                        </div>
                        <div
                            className="category"
                            style={{fontSize: '0.8vw', color: '#555'}}
                        >
                            Category: {ingredientData.category}
                        </div>
                    </div>
                    <hr
                        className="separator"
                        style={{
                            margin: '1%',
                            border: 'none',
                            borderTop: '1px solid #ccc',
                        }}
                    />

                    {/*/!* Molecules Section (Replace placeholders with actual data) *!/*/}
                    {/*<div className="molecules-section" style={{marginTop: '1%'}}>*/}
                    {/*    <h2 style={{fontSize: '1.5vw'}}>Molecules</h2>*/}
                    {/*    /!* Add your molecule data here *!/*/}
                    {/*    /!* Example: <div className="molecule-item" style={{ fontSize: '0.8vw' }}>Molecule: {ingredientData.molecule}</div> *!/*/}
                    {/*</div>*/}

                    {/*/!* Flavors Section (Replace placeholders with actual data) *!/*/}
                    {/*<div className="flavors-section" style={{marginTop: '1%'}}>*/}
                    {/*    <h2 style={{fontSize: '1.5vw'}}>Flavors</h2>*/}
                    {/*    /!* Add your flavor data here *!/*/}
                    {/*    /!* Example: <div className="flavor-item" style={{ fontSize: '0.8vw' }}>Flavor: {ingredientData.flavor}</div> *!/*/}
                    {/*</div>*/}

                </div>
            )}
        </div>
    );
};

export default IngredientCard;
