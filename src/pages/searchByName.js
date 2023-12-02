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
                setSearchData(data);
            } else {
                setSearchData("Nothing Found");
                // setErrorMessage("No data found");
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

export default SearchByName;