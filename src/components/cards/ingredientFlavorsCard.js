import React from "react";
import {ResponsiveRadar} from "@nivo/radar";
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor} from "../../colors";


const IngredientFlavorsCard = ({ingredientName, radarData}) => {

    if (radarData === null) {
        return <div>No radar data available.</div>;
    }

    const flavorCounts = countFlavorProfiles(radarData.molecules);
    const sortedFlavorCounts = Object.keys(flavorCounts).sort((a, b) => flavorCounts[b] - flavorCounts[a]);
    const radarChartData = Object.keys(flavorCounts).map((key) => {
        const [flavor, commonName] = key.split('_');
        return {taste: flavor, count: flavorCounts[key]};
    });

    const totalFlavorProfiles = Object.values(flavorCounts).reduce((total, count) => total + count, 0);

    return (
        <div style={{
            display: 'flex',
            backgroundColor: pageSectionColor,
            borderRadius: '8px',
            padding: '1%',
            border: '1px solid #000',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            boxSizing: 'border-box',
            marginTop: '1%',
            marginBottom: '1%'
        }}>
            <div style={{
                fontFamily: 'Roboto, sans-serif',
                backgroundColor: sectionItemColor,
                minWidth: '25vw',
                width: '50%',
                height: '50vh',
                borderRadius: '8px',
                margin: '1%',
                overflow: 'auto',
                fontSize: '1em',
                border: '1px solid #000',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
            }}>
                <h2 style={{
                    borderBottom: '1px solid #232b2b',
                    paddingBottom: '0.5em',
                    marginLeft: '5%',
                    width: '90%'
                }}>All Flavor Profiles: {ingredientName && ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1)}</h2>
                {radarData.molecules.length > 0 ? (
                    <>
                        <p>Total Flavor Profiles: {totalFlavorProfiles}</p>
                        {sortedFlavorCounts.map((key, index) => (
                            <div key={index}>
                                <p>{key}: {flavorCounts[key]}</p>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>No Molecules, that doesn't seem right!</p>
                )}
            </div>
            <div style={{
                minWidth: '25vw',
                width: '50%',
                height: '50vh',
                backgroundColor: sectionItemColor,
                margin: '1%',
                padding: '1%',
                border: '1px solid #000',
                borderRadius: '8px',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
            }}>
                <ResponsiveRadar
                    data={radarChartData}
                    keys={['count']}
                    indexBy="taste"
                    margin={{top: 70, right: 80, bottom: 40, left: 80}}
                    borderColor={{from: 'color'}}
                    gridLabelOffset={36}
                    dotSize={10}
                    dotColor={{theme: 'background'}}
                    dotBorderWidth={2}
                    colors={['#FF5733', '#33FF57', '#5733FF', '#33B8FF']}
                    blendMode="multiply"
                    motionConfig="wobbly"
                    legends={[
                        {
                            anchor: 'top-left',
                            direction: 'column',
                            translateX: -50,
                            translateY: -40,
                            itemWidth: 80,
                            itemHeight: 20,
                            itemTextColor: '#999',
                            symbolSize: 12,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000',
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </div>
    );
};


// TODO: This should probably be backend function?
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

export default IngredientFlavorsCard;