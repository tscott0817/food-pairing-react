import React, {useEffect, useRef, useState} from "react";
import {ResponsiveRadar} from "@nivo/radar";
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor} from "../../colors";
import {MdFullscreen, MdFullscreenExit} from 'react-icons/md';
import {buttonBackgroundColor} from "../../colors";


// TODO: This is not accurately getting shared flavors (lobster / lemon each have 1 garlic; but NOT in shared list)
//  - moleculeData does not seem to have everything.
const SharedMoleculesFlavorsCard = ({moleculeData}) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const chartContainerRef = useRef(null);

    if (moleculeData === null) {
        return <div>No radar data available.</div>;
    }

    // TODO: Might want to put this into backend?
    const flavorCounts = countFlavorProfiles(moleculeData);
    const radarChartData = Object.keys(flavorCounts).map((key) => {
        const [flavor, commonName] = key.split('_');
        return {
            taste: flavor,
            count: flavorCounts[key],
        };
    });

    const flavorListData = Object.keys(flavorCounts).map((key) => {
        return {
            flavorProfile: key,
            count: flavorCounts[key],
        };
    });
    // Sort radarChartData in descending order based on count
    flavorListData.sort((a, b) => b.count - a.count);

    const toggleFullScreen = () => {
        const chartContainer = chartContainerRef.current;

        if (chartContainer) {
            if (!isFullScreen) {
                if (chartContainer.requestFullscreen) {
                    chartContainer.requestFullscreen();
                } else if (chartContainer.mozRequestFullScreen) {
                    chartContainer.mozRequestFullScreen();
                } else if (chartContainer.webkitRequestFullscreen) {
                    chartContainer.webkitRequestFullscreen();
                } else if (chartContainer.msRequestFullscreen) {
                    chartContainer.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }

            setIsFullScreen(!isFullScreen);
        }
    };

    return (<div style={{
            display: 'flex',
            backgroundColor: pageSectionColor,
            width: '96%',
            borderRadius: '8px',
            padding: "1%",
            border: '1px solid #000',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            boxSizing: 'border-box',
            // marginTop: '1%',
            marginBottom: '1%',
            marginLeft: '2%',
        }}>
            <div style={{
                fontFamily: 'Roboto, sans-serif',
                backgroundColor: sectionItemColor,
                minWidth: '25vw',
                width: '50%',
                height: '50vh',  // TODO: ON -> Forces scrolling; OFF -> Scales page height to fit content
                borderRadius: '8px',
                margin: "1%",
                overflow: 'auto',
                fontSize: '1em',
                border: '1px solid #000',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(125px, 1fr))', // Adjust the column width as needed
                gridGap: '1em',
            }}>
                <div style={{gridColumn: '1 / -1'}}> {/* This spans across all columns */}
                    <h2 style={{
                        borderBottom: '1px solid #232b2b',
                        paddingBottom: '0.5em',
                        marginLeft: "5%",
                        width: "90%",
                    }}>Flavor Profiles of Shared Molecules (Weighed Heavier)</h2>

                </div>
                {flavorListData.length > 0 ? (
                    flavorListData.map((profile, index) => (
                        <div key={index} style={{textAlign: 'center'}}>
                            <p>{profile.flavorProfile}: {profile.count}</p>
                        </div>
                    ))
                ) : (
                    <p>No Shared Flavor Profiles</p>
                )}
            </div>
            <div ref={chartContainerRef}
                 style={{
                     position: 'relative',
                     minWidth: '25vw',
                     width: '50%',
                     height: '50vh',
                     margin: '1%',
                     padding: '2%',
                     borderRadius: '8px',
                     border: '1px solid #000',
                     boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                     boxSizing: 'border-box',
                     backgroundColor: sectionItemColor,

                 }}>
                <button
                    onClick={toggleFullScreen}
                    style={{
                        position: 'absolute',
                        // width: '30px',
                        // height: '30px',
                        top: '10px',
                        left: '10px',
                        zIndex: 1,
                        borderRadius: '8px',
                        background: buttonBackgroundColor, // or 'rgba(0, 0, 0, 0)'
                        border: 'none', // optional, to remove the border
                    }}
                >
                    {isFullScreen ? (
                        <MdFullscreenExit size={30}/> // Adjust the size as needed
                    ) : (
                        <MdFullscreen size={30}/> // Adjust the size as needed
                    )}
                </button>
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
                    legends={[{
                        anchor: 'top-left',
                        direction: 'column',
                        translateX: -50,
                        translateY: -40,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: '#999',
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [{
                            on: 'hover', style: {
                                itemTextColor: '#000',
                            },
                        },],
                    },]}
                />
            </div>
        </div>
    );
}

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

export default SharedMoleculesFlavorsCard;