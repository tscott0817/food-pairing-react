import React, { useState } from 'react';


function SearchByName() {
    const [searchID, setSearchId] = useState('');
    const [searchData, setSearchData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const searchByName = async () => {
        try {
            const searchResponse = await fetch(`http://localhost:5000/api/flavordb/${searchID}`);
            const { data } = await searchResponse.json();

            if (data) {
                // Update the state with fetched data
                setSearchData(data);
            } else {
                setErrorMessage("No data found");
            }
        } catch (error) {
            console.error('Error fetching or parsing data:', error);
            setErrorMessage("Error fetching data");
        }
    };

    return (
        <div>
            <div>
                <label>Enter Ingredient Name </label>
                <input type="text" value={searchID} onChange={(e) => setSearchId(e.target.value)} />
            </div>
            <button onClick={searchByName}>Search</button>
            <div>
                {errorMessage && <p>{errorMessage}</p>}
                {searchData && (
                    <div>
                        <h2>Ingredient</h2>
                        <p>{JSON.stringify(searchData)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}


// function SearchByName() {
//     const [searchID, setSearchId] = useState('');
//     const [searchData, setSearchData] = useState(null);
//
//     const searchByName = async () => {
//         try {
//             const searchResponse = await fetch(`http://localhost:5000/api/flavordb/${searchID}`);
//             const data = await searchResponse.json();
//
//             // Check if the response contains data before updating the state
//             if (data.data) {
//                 // Update the state with fetched data
//                 setSearchData(data.data);
//
//                 // Manipulate the state data only if searchData is not null
//                 const sanitizedData = data.data.map(item => ({
//                     ...item,
//                     // Replace 'NaN' with 'none' in the specific column (replace 'columnName' with the actual column name)
//                     columnName: isNaN(item.columnName) ? 'none' : item.columnName,
//                     // Add more columns if needed
//                 }));
//
//                 // Update the state with the manipulated data
//                 setSearchData(sanitizedData);
//             } else {
//                 // Handle the case when no data is found
//                 setSearchData("Nothing Here");
//             }
//         } catch (error) {
//             // Handle fetch or JSON parsing errors
//             console.error('Error fetching or parsing data:', error);
//             // Optionally, set a default or empty state here
//             setSearchData("Nothing Here");
//         }
//     }
//
//     return (
//         <div>
//             <div>
//                 <label>Enter Ingredient Name </label>
//                 <input type="text" value={searchID} onChange={(e) => setSearchId(e.target.value)} />
//             </div>
//             <button onClick={searchByName}>Search</button>
//             <div>
//                 <h2>Ingredient</h2>
//                 {searchData && <p>{JSON.stringify(searchData)}</p>}
//             </div>
//         </div>
//
//     );
// }

export default SearchByName;