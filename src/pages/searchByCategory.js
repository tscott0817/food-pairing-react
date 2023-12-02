import React, { useState } from 'react';

function SearchByCategory() {
    const [searchCategory, setSearchCategory] = useState('');
    const [searchData, setSearchData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const searchByCategory = async () => {
        try {
            const searchResponse = await fetch(`http://localhost:5000/api/flavordb/category/${searchCategory}`);
            const { aliases } = await searchResponse.json();

            if (aliases) {
                setSearchData(aliases);
            } else {
                setSearchData(["Nothing Found"]);
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
                <label>Enter Category Name </label>
                <input type="text" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} />
            </div>
            <button onClick={searchByCategory}>Search</button>
            <div>
                {errorMessage && <p>{errorMessage}</p>}
                {searchData && (
                    <div>
                        <h2>Aliases</h2>
                        {searchData.map((alias, index) => (
                            <div key={index}>{alias}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchByCategory;