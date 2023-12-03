import React, { useState } from 'react';
import './css/IngredientPage.css';
const IngredientPage = () => {
  const [ingredientData, setIngredientData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchIngredientData = async () => {
    // const alias = match.params.alias;
    const alias = "lobster";

    try {
      const response = await fetch(`http://localhost:5000/api/flavordb/${alias}`);
      const { data } = await response.json();

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

  // Fetch data when the component mounts
  React.useEffect(() => {
    fetchIngredientData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      {ingredientData && (
        <div className="ingredient-container">
          <div className="top-left-section">
            <div className="alias">{ingredientData.alias}</div>
            <div className="scientific-name">Scientific Name: {ingredientData.scientificName}</div>
          </div>

          <hr className="separator" />

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
    </div>
  );
};

export default IngredientPage;