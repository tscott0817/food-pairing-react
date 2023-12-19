import {ResponsiveRadar} from '@nivo/radar';
import {useEffect, useState} from "react";

const RadarCompare = ({ radarData }) => {
    if (radarData === null) {
        return <div>No radar data available.</div>;
    }

    const flavorCounts = countFlavorProfiles(radarData);
    const radarChartData = Object.keys(flavorCounts).map((key) => {
        const [flavor, commonName] = key.split('_');
        return {
            taste: flavor,
            count: flavorCounts[key],
        };
    });

    return (
        <div style={{ backgroundColor: '#f2f2f2', borderRadius: '8px', paddingBottom: "1%", paddingTop: "1%", marginTop: "1%" }}>
            <h2>List of Common Data:</h2>
            <ul>
                {radarData.map((item, index) => (
                    <li key={index}>
                        <strong>Common Name:</strong> {item.commonName}<br />
                        <strong>Flavor Profile:</strong> {item.flavorProfile.join(', ')}<br />
                        <strong>Index Position:</strong> {item.indexPos}<br />
                        <strong>Pubchem ID:</strong> {item.pubchemID}<br />
                        <hr />
                    </li>
                ))}
            </ul>
                        <div>
            <h3>Flavor Profile Counts:</h3>
                <ul>
                    {Object.entries(flavorCounts).map(([flavor, count]) => (
                        <li key={flavor}>
                            {flavor}: {count}
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ minWidth: '25vw', width: '50%',height: '400px', backgroundColor: 'green', marginLeft: "25%", padding: "1%"}}>
                <ResponsiveRadar
                    data={radarChartData}
                    keys={['count']}
                    indexBy="taste"
                    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                    borderColor={{ from: 'color' }}
                    gridLabelOffset={36}
                    dotSize={10}
                    dotColor={{ theme: 'background' }}
                    dotBorderWidth={2}
                    // colors={{ scheme: 'nivo' }}
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


const countFlavorProfiles = (flavorProfiles) => {
    const flavorCounts = {};

    flavorProfiles.forEach((item) => {
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

export default RadarCompare;