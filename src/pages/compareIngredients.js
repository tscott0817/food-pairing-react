import React, {useEffect, useState} from "react";
import PieCompare from "../components/charts/pieCompare";
import SharedMoleculesFlavorsCard from "../components/cards/sharedMoleculesFlavorsCard";
import IngredientFlavorsCard from "../components/cards/ingredientFlavorsCard";
import IngredientMoleculesCard from "../components/cards/ingredientMoleculesCard";
import IngredientCard from "../components/cards/ingredientCard";

function CompareIngredients() {
    const [ingredient1Id, setIngredient1Id] = useState('');
    const [ingredient2Id, setIngredient2Id] = useState('');
    const [ingredient1Data, setIngredient1Data] = useState(null);
    const [ingredient2Data, setIngredient2Data] = useState(null);
    const [sharedMolecules, setSharedMolecules] = useState([]);
    const [radarData, setRadarData] = useState(null);
    const [radarData1, setRadarData1] = useState(null);
    const [radarData2, setRadarData2] = useState(null);
    const [ingredientName1, setIngredientName1] = useState('');
    const [ingredientName2, setIngredientName2] = useState('');

    const fetchData = async () => {
        const response1 = await fetch(`http://localhost:5000/api/flavordb/${ingredient1Id}`);
        const data1 = await response1.json();
        setIngredient1Data(data1.data);
        setIngredientName1(data1.data.alias)

        const response2 = await fetch(`http://localhost:5000/api/flavordb/${ingredient2Id}`);
        const data2 = await response2.json();
        setIngredient2Data(data2.data);
        setIngredientName2(data2.data.alias)

        const entityID1 = data1.data.entityID || '';
        const entityID2 = data2.data.entityID || '';

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

    return (
        <div style={{fontFamily: 'Roboto, sans-serif', maxWidth: '90vw', margin: '0 auto', padding: '20px'}}>
            <div>
                <label>Ingredient or ID 1: </label>
                <input type="text" value={ingredient1Id} onChange={(e) => setIngredient1Id(e.target.value)}/>
            </div>
            <div>
                <label>Ingredient or ID 2: </label>
                <input type="text" value={ingredient2Id} onChange={(e) => setIngredient2Id(e.target.value)}/>
            </div>
            <button onClick={fetchData}>Fetch Data</button>
            <SharedMoleculesFlavorsCard sharedMolecules={sharedMolecules} radarData={radarData}/>
            <IngredientCard ingredient={ingredient1Data} />
            <IngredientFlavorsCard ingredientName={ingredientName1} radarData={radarData1}/>
            <IngredientMoleculesCard ingredientName={ingredientName1} radarData={radarData1}/>
            <IngredientFlavorsCard ingredientName={ingredientName2} radarData={radarData2}/>
            <IngredientMoleculesCard ingredientName={ingredientName2} radarData={radarData2}/>
            <PieCompare item1Data={ingredient1Data} item2Data={ingredient2Data} sharedMolecules={sharedMolecules}/>
        </div>
    );
}

export default CompareIngredients;