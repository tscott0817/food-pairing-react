import React, {useState} from "react";

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
        const responseShared = await fetch(`http://localhost:5000/api/common-elements/${item1Id}/${item2Id}`);
        const dataShared = await responseShared.json();
        setSharedMolecules(dataShared.common_elements || []);

        // setFetchDataClicked(true);
    };


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
            <div>
                <h2>Item 1</h2>
                {item1Data && <p>{JSON.stringify(item1Data)}</p>}
            </div>
            <div>
                <h2>Item 2</h2>
                {item2Data && <p>{JSON.stringify(item2Data)}</p>}
            </div>
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
        </div>
    );
}

export default CompareIngredients;