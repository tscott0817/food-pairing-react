import React, {useEffect, useState} from "react";
import SharedMoleculesFlavorsCard from "../components/cards/sharedMoleculesFlavorsCard";
import IngredientPage from "./ingredientPage";
import IngredientFlavorsCard from "../components/cards/ingredientFlavorsCard";
import IngredientMoleculesCard from "../components/cards/ingredientMoleculesCard";
import PieCompare from "../components/charts/pieCompare";

const CompareIngredientsGlobal = ({ingredient1, ingredient2}) => {
    const [sharedMolecules, setSharedMolecules] = useState([]);
    const [radarData, setRadarData] = useState(null);
    const [radarData1, setRadarData1] = useState(null);
    const [radarData2, setRadarData2] = useState(null);
    const [ingredientName1, setIngredientName1] = useState('');
    const [ingredientName2, setIngredientName2] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Use the 'entityID' directly from the data
            const entityID1 = ingredient1.entityID || '';
            const entityID2 = ingredient2.entityID || '';

            // Fetch shared molecules using the entity IDs
            const responseShared = await fetch(`http://localhost:5000/api/common-molecules/${entityID1}/${entityID2}`);
            const dataShared = await responseShared.json();
            setSharedMolecules(dataShared.common_elements || []);

            const responseRadar = await fetch(`http://localhost:5000/api/common-data/${entityID1}/${entityID2}`);
            const dataRadar = await responseRadar.json();
            setRadarData(dataRadar.common_data);

            const singleRadarResponse1 = await fetch(`http://localhost:5000/api/flavordb/ingredient-molecules/${entityID1}`);
            const singleRadarData1 = await singleRadarResponse1.json();
            setRadarData1(singleRadarData1);

            const singleRadarResponse2 = await fetch(`http://localhost:5000/api/flavordb/ingredient-molecules/${entityID2}`);
            const singleRadarData2 = await singleRadarResponse2.json();
            setRadarData2(singleRadarData2);
        };

        fetchData(); // Call fetchData when the component mounts
    }, [ingredient1, ingredient2]); // useEffect will run whenever ingredient1 or ingredient2 changes


    return (
        <div style={{
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: '#e62981',
            maxWidth: '90vw',
            margin: '0 auto',
            padding: '20px'
        }}>
            {/*<div>*/}
            {/*    <label>Ingredient 1: {ingredient1.alias} </label>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <label>Ingredient 2: {ingredient2.alias} </label>*/}
            {/*</div>*/}

            <SharedMoleculesFlavorsCard sharedMolecules={sharedMolecules} radarData={radarData}/>
            {/*<IngredientsCard item1Data={item1Data} item2Data={item2Data}/>*/}
            <IngredientPage ingredient={ingredient1}/>
            <IngredientFlavorsCard ingredientName={ingredientName1} radarData={radarData1}/>
            <IngredientMoleculesCard ingredientName={ingredientName1} radarData={radarData1}/>
            <IngredientPage ingredient={ingredient2}/>
            <IngredientFlavorsCard ingredientName={ingredientName2} radarData={radarData2}/>
            <IngredientMoleculesCard ingredientName={ingredientName2} radarData={radarData2}/>
            <PieCompare item1Data={ingredient1} item2Data={ingredient2} sharedMolecules={sharedMolecules}/>
        </div>
    );
}

export default CompareIngredientsGlobal;