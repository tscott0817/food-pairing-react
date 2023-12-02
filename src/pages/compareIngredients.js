import React, {useState} from "react";
import {ResponsivePie} from "@nivo/pie";

function CompareIngredients() {

    const [item1Id, setItem1Id] = useState('');
    const [item2Id, setItem2Id] = useState('');
    const [item1Data, setItem1Data] = useState(null);
    const [item2Data, setItem2Data] = useState(null);
    const [sharedMolecules, setSharedMolecules] = useState([]);
    const [fetchDataClicked, setFetchDataClicked] = useState(false);


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

        // setFetchDataClicked(true);
    };


    // TODO: This is temp, need to fix 'molcules' column in db
    const countWordsInString = (str) => {
        // Remove curly braces and single quotes
        const cleanedStr = str.replace(/['{}]/g, '');

        // Split the string into an array of words
        const wordsArray = cleanedStr.split(',');

        // Count the number of words
        const wordCount = wordsArray.length;

        return wordCount;
    };

        // Render the chart only when both item1Data and sharedMolecules are available
    const isDataReady = item1Data && sharedMolecules.length > 0;

    const data = isDataReady
        ? [
              {
                  id: 'Shared id',
                  label: 'Shared label',
                  value: sharedMolecules.length,
                  color: 'hsl(90, 70%, 50%)',
              },
              {
                  id: 'total id',
                  label: 'total label',
                  value: item1Data && item1Data.molecules ? countWordsInString(item1Data.molecules) - sharedMolecules.length : 0,
                  // value: item1Data.molecules.length,
                  // value: Array.isArray(item1Data?.molecules) ? item1Data.molecules.length - sharedMolecules.length : 0,
                  color: 'hsl(56, 70%, 50%)',
              },
          ]
        : [];


    // Render the chart only when both item2Data and sharedMolecules are available
    const isDataReadyItem2 = item2Data && sharedMolecules.length > 0;

    const dataItem2 = isDataReadyItem2
        ? [
              {
                  id: 'Shared id',
                  label: 'Shared label',
                  value: sharedMolecules.length,
                  color: 'hsl(90, 70%, 50%)',
              },
              {
                  id: 'total id',
                  label: 'total label',
                  value: item2Data && item2Data.molecules ? countWordsInString(item2Data.molecules) - sharedMolecules.length : 0,
                  color: 'hsl(56, 70%, 50%)',
              },
          ]
        : [];



    return (
        <div>
            <div>
                <label>Enter Item 1 ID: </label>
                <input type="number" value={item1Id} onChange={(e) => setItem1Id(e.target.value)} />
            </div>
            <div>
                <label>Enter Item 2 ID: </label>
                <input type="number" value={item2Id} onChange={(e) => setItem2Id(e.target.value)} />
            </div>
            <button onClick={fetchData}>Fetch Data</button>
            {/*<div>*/}
            {/*    <h2>Item 1</h2>*/}
            {/*    /!*{item1Data && <p>{JSON.stringify(item1Data)}</p>}*!/*/}
            {/*    {item1Data && <p>{JSON.stringify(item1Data)}</p>}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <h2>Item 2</h2>*/}
            {/*    {item2Data && <p>{JSON.stringify(item2Data)}</p>}*/}
            {/*</div>*/}
            <div>
                <h2>Shared Molecule Details</h2>
                {sharedMolecules.length > 0 ? (
                    sharedMolecules.map((detail, index) => (
                        <div key={index}>
                            <p>{detail}</p>
                        </div>
                    ))
                ) : (
                    <p>No Common Molecules</p>
                )}
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, height: 400, marginRight: '20px' }}>
                    <h2>Charts for Item 1</h2>
                    <ResponsivePie
                        data={data}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                    />
                </div>
                <div style={{ flex: 1, height: 400}}>
                    <h2>Charts for Item 2</h2>
                    <ResponsivePie
                        data={dataItem2}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                    />
                </div>
            </div>
        </div>
    );
}

export default CompareIngredients;