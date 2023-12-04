import React, {useState} from "react";
import {ResponsivePie} from "@nivo/pie";
import PieCompare from "../components/pieCompare";
import SharedMoleculesCard from "../components/cards/sharedMoleculesCard";
import IngredientsCard from "../components/cards/ingredientsCard";
import RadarCompare from "../components/radarCompare";


// TODO: Break this whole file into components
function CompareIngredients() {

    const [item1Id, setItem1Id] = useState('');
    const [item2Id, setItem2Id] = useState('');
    const [item1Data, setItem1Data] = useState(null);
    const [item2Data, setItem2Data] = useState(null);
    const [sharedMolecules, setSharedMolecules] = useState([]);
    const [fetchDataClicked, setFetchDataClicked] = useState(false);
    const [radarData, setRadarData] = useState(null);


    const fetchData = async () => {
        // Fetch data for item 1
        const response1 = await fetch(`http://localhost:5000/api/flavordb/${item1Id}`);
        const data1 = await response1.json();
        setItem1Data(data1.data);

        // Fetch data for item 2
        const response2 = await fetch(`http://localhost:5000/api/flavordb/${item2Id}`);
        const data2 = await response2.json();
        setItem2Data(data2.data);

        // Fetch shared molecules
        const responseShared = await fetch(`http://localhost:5000/api/common-molecules/${item1Id}/${item2Id}`);
        const dataShared = await responseShared.json();
        setSharedMolecules(dataShared.common_elements || []);

        const responseRadar = await fetch(`http://localhost:5000/api/common-data/${item1Id}/${item2Id}`);
        const dataRadar = await responseRadar.json();
        setRadarData(dataRadar.common_data);

        // setFetchDataClicked(true);
    };

    return (
        <div style={{ backgroundColor: '#e62981', maxWidth: '90vw', margin: '0 auto', padding: '20px' }}>
            <div>
                <label>Enter Item 1 ID: </label>
                <input type="text" value={item1Id} onChange={(e) => setItem1Id(e.target.value)} />
            </div>
            <div>
                <label>Enter Item 2 ID: </label>
                <input type="text" value={item2Id} onChange={(e) => setItem2Id(e.target.value)} />
            </div>
            <button onClick={fetchData}>Fetch Data</button>

            {/*<IngredientsCard item1Data={item1Data} item2Data={item2Data} />*/}
            <SharedMoleculesCard sharedMolecules={sharedMolecules} />
            <PieCompare item1Data={item1Data} item2Data={item2Data} sharedMolecules={sharedMolecules} />
            <RadarCompare radarData={radarData} />
        </div>
    );
}

export default CompareIngredients;