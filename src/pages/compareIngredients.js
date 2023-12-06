import React, {useEffect, useState} from "react";
import {ResponsivePie} from "@nivo/pie";
import PieCompare from "../components/charts/pieCompare";
import SharedMoleculesCard from "../components/cards/sharedMoleculesCard";
import IngredientsCard from "../components/cards/ingredientsCard";
import RadarCompare from "../components/charts/radarCompare";
import SharedMoleculesFlavorsCard from "../components/cards/sharedMoleculesFlavorsCard";
import IngredientFlavorsCard from "../components/cards/ingredientFlavorsCard";
import IngredientMoleculesCard from "../components/cards/ingredientMoleculesCard";
import IngredientFlavorsCardList from "../components/cards/ingredientFlavorsCardList";
import IngredientPage from "./ingredientPage";


// TODO: Break this whole file into components
function CompareIngredients() {

    const [item1Id, setItem1Id] = useState('');
    const [item2Id, setItem2Id] = useState('');
    const [item1Data, setItem1Data] = useState(null);
    const [item2Data, setItem2Data] = useState(null);
    const [sharedMolecules, setSharedMolecules] = useState([]);
    const [radarData, setRadarData] = useState(null);

    const [radarData1, setRadarData1] = useState(null);
    const [radarData2, setRadarData2] = useState(null);
    const [ingredientName1, setIngredientName1] = useState('');
    const [ingredientName2, setIngredientName2] = useState('');


    const fetchData = async () => {
        // Fetch data for item 1
        const response1 = await fetch(`http://localhost:5000/api/flavordb/${item1Id}`);
        const data1 = await response1.json();
        setItem1Data(data1.data);
        setIngredientName1(data1.data.alias)

        // Fetch data for item 2
        const response2 = await fetch(`http://localhost:5000/api/flavordb/${item2Id}`);
        const data2 = await response2.json();
        setItem2Data(data2.data);
        setIngredientName2(data2.data.alias)

        // Use the 'entityID' directly from the data
        const entityID1 = data1.data.entityID || '';
        const entityID2 = data2.data.entityID || '';

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

    return (
        <div style={{fontFamily: 'Roboto, sans-serif', backgroundColor: '#e62981', maxWidth: '90vw', margin: '0 auto', padding: '20px'}}>
            <div>
                <label>Ingredient or ID 1: </label>
                <input type="text" value={item1Id} onChange={(e) => setItem1Id(e.target.value)}/>
            </div>
            <div>
                <label>Ingredient or ID 2: </label>
                <input type="text" value={item2Id} onChange={(e) => setItem2Id(e.target.value)}/>
            </div>
            <button onClick={fetchData}>Fetch Data</button>

            <SharedMoleculesFlavorsCard sharedMolecules={sharedMolecules} radarData={radarData}/>
            {/*<IngredientsCard item1Data={item1Data} item2Data={item2Data}/>*/}
            <IngredientPage ingredient={item1Data} />
            <IngredientFlavorsCard ingredientName={ingredientName1} radarData={radarData1}/>
            <IngredientMoleculesCard ingredientName={ingredientName1} radarData={radarData1}/>
            <IngredientFlavorsCard ingredientName={ingredientName2} radarData={radarData2}/>
            <IngredientMoleculesCard ingredientName={ingredientName2} radarData={radarData2}/>
            <PieCompare item1Data={item1Data} item2Data={item2Data} sharedMolecules={sharedMolecules}/>
        </div>
    );
}

export default CompareIngredients;