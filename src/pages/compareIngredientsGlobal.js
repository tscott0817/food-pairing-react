import React, {useEffect, useState} from "react";
import SharedMoleculesFlavorsCard from "../components/cards/sharedMoleculesFlavorsCard";
import IngredientCard from "../components/cards/ingredientCard";
import IngredientFlavorsCard from "../components/cards/ingredientFlavorsCard";
import IngredientMoleculesCard from "../components/cards/ingredientMoleculesCard";
import PieCompare from "../components/charts/pieCompare";
import IngredientCombinedCard from "../components/cards/ingredientCombinedCard";
import ResultsCard from "../components/cards/resultsCard";
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor} from "../colors";

const CompareIngredientsGlobal = ({ingredient1, ingredient2}) => {
    const [sharedMolecules, setSharedMolecules] = useState([]);
    const [radarData, setRadarData] = useState(null);
    const [radarData1, setRadarData1] = useState(null);
    const [radarData2, setRadarData2] = useState(null);
    const [ingredientName1, setIngredientName1] = useState('');
    const [ingredientName2, setIngredientName2] = useState('');

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
            backgroundColor: pageColor,
            maxWidth: '90vw',
            margin: '0 auto',
            padding: '20px',
            paddingTop: '60px'
        }}>
            <IngredientCombinedCard ingredient1={ingredient1} ingredient2={ingredient2}/>
            <ResultsCard ingredient1={ingredient1} ingredient2={ingredient2}/>
            <SharedMoleculesFlavorsCard sharedMolecules={sharedMolecules} radarData={radarData}/>
            <IngredientFlavorsCard ingredientName={ingredientName1} radarData={radarData1}/>
            <IngredientMoleculesCard ingredientName={ingredientName1} radarData={radarData1}/>
            <IngredientFlavorsCard ingredientName={ingredientName2} radarData={radarData2}/>
            <IngredientMoleculesCard ingredientName={ingredientName2} radarData={radarData2}/>
            <PieCompare item1Data={ingredient1} item2Data={ingredient2} sharedMolecules={sharedMolecules}/>
        </div>
    );
}

export default CompareIngredientsGlobal;