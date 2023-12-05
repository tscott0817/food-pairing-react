import React from "react";
import {ResponsiveRadar} from "@nivo/radar";


const IngredientFlavorsCardList = ({ ingredientName, radarData }) => {
    if (radarData === null) {
        return <div>No radar data available.</div>;
    }

    const flavorCounts = countFlavorProfiles(radarData.molecules);

    return (
        <div style={{ display: 'flex', backgroundColor: '#fcba03', borderRadius: '8px', padding: '1%' }}>
            <div style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: 'green', minWidth: '25vw', width: '50%', height: '50vh', borderRadius: '8px', margin: '1%', overflow: 'auto', fontSize: '1em' }}>
                <h2 style={{ borderBottom: '1px solid #232b2b', paddingBottom: '0.5em', marginLeft: '5%', width: '90%' }}>{ingredientName} Flavor Profile Details</h2>
                {radarData.molecules.length > 0 ? (
                    Object.keys(flavorCounts).map((key, index) => (
                        <div key={index}>
                            <p>{key}: {flavorCounts[key]}</p>
                        </div>
                    ))
                ) : (
                    <p>No Molecules, that doesn't seem right!</p>
                )}
            </div>
        </div>
    );
};

const countFlavorProfiles = (molecules) => {
    const flavorCounts = {};

    molecules.forEach((item) => {
        item.flavorProfile.forEach((profile) => {
            const cleanedProfile = profile.replace(/'/g, ''); // Remove single quotes
            if (flavorCounts[cleanedProfile]) {
                flavorCounts[cleanedProfile]++;
            } else {
                flavorCounts[cleanedProfile] = 1;
            }
        });
    });

    return flavorCounts;
};

export default IngredientFlavorsCardList;