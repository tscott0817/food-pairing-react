import {ResponsivePie} from "@nivo/pie";
import React, {useState} from "react";
import {pageSectionColor, sectionItemColor} from "../../colors";


function PieCompare({item1Data, item2Data, sharedMolecules}) {


    // // TODO: Add shared
    // if (item1Data === null  || item2Data === null) {
    //     return <div>No radar data available.</div>;
    // }

    // TODO: This is temp, need to fix 'molcules' column in db
    const countWordsInString = (str) => {
        // Remove curly braces and single quotes
        const cleanedStr = str.replace(/['{}]/g, '');

        // Split the string into an array of words
        const wordsArray = cleanedStr.split(',');

        // Count the number of words
        return wordsArray.length;
    };

    // Render the chart only when both item1Data and sharedMolecules are available
    const isDataReady = item1Data && sharedMolecules.length > 0;

    const dataItem1 = isDataReady
        ? [
            {
                id: sharedMolecules.length + ' Molecules in common',
                label: 'Shared label',
                value: sharedMolecules.length,
                color: 'hsl(90, 70%, 50%)',
            },
            {
                id: (countWordsInString(item1Data.molecules) - sharedMolecules.length) + ' Molecules isolated',
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
                id: sharedMolecules.length + ' Molecules in common',
                label: 'Shared label',
                value: sharedMolecules.length,
                color: 'hsl(90, 70%, 50%)',
            },
            {
                id: (countWordsInString(item2Data.molecules) - sharedMolecules.length) + ' Molecules isolated',
                label: 'total label',
                value: item2Data && item2Data.molecules ? countWordsInString(item2Data.molecules) - sharedMolecules.length : 0,
                color: 'hsl(56, 70%, 50%)',
            },
        ]
        : [];

    return (
        <div style={{
            display: 'flex',
            backgroundColor: pageSectionColor,
            padding: '1%',
            borderRadius: '8px',
            border: '1px solid #000',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            boxSizing: 'border-box',
            marginTop: '1%',
            marginBottom: '1%'
        }}>
            {/*<div style={{flex: 1, height: 400, marginRight: '20px'}}>*/}
            <div style={{
                backgroundColor: sectionItemColor,
                minWidth: '25vw',
                width: '50%',
                height: '50vh',
                margin: '1%',
                borderRadius: '8px',
                border: '1px solid #000',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
            }}>
                {/*TODO: Need these to activate when fetchData is clicked*/}
                {/*<h2>{item1Data.alias} composition</h2>*/}
                <ResponsivePie
                    data={dataItem1}
                    margin={{top: 40, right: 40, bottom: 40, left: 40}}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{from: 'color'}}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{from: 'color', modifiers: [['darker', 2]]}}
                    colors={['#f47560', '#e8c1a0']}
                    arcLabel={({value}) => `${(value / dataItem1.reduce((acc, d) => acc + d.value, 0) * 100).toFixed(2)}%`}
                    // layers={[
                    //     'arcs',
                    //     'arcLabels',
                    //     'arcLinkLabels',
                    //     () => (
                    //         <text
                    //             x="39%"
                    //             y="36%"
                    //             textAnchor="middle"
                    //             dominantBaseline="middle"
                    //             style={{
                    //                 fontSize: '20px',
                    //                 fontWeight: 'bold',
                    //                 fill: '#333333',
                    //             }}
                    //         >
                    //             {item1Data.alias}
                    //         </text>
                    //     ),
                    // ]}
                />
            </div>
            {/*<div style={{flex: 1, height: 400}}>*/}
            <div style={{
                backgroundColor: sectionItemColor,
                minWidth: '25vw',
                width: '50%',
                height: '50vh',
                margin: "1%",
                borderRadius: '8px',
                border: '1px solid #000',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
            }}>
                {/*<h2>{item2Data.alias} composition</h2>*/}
                <ResponsivePie
                    data={dataItem2}
                    margin={{top: 40, right: 40, bottom: 40, left: 40}}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{from: 'color'}}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{from: 'color', modifiers: [['darker', 2]]}}
                    colors={['#f47560', '#e8c1a0']}
                    // just make the arc label a percentage
                    arcLabel={({value}) => `${(value / dataItem2.reduce((acc, d) => acc + d.value, 0) * 100).toFixed(2)}%`}
                    // layers={[
                    //     'arcs',
                    //     'arcLabels',
                    //     'arcLinkLabels',
                    //     () => (
                    //         <text
                    //             x="39.5%"
                    //             y="36%"
                    //             textAnchor="middle"
                    //             dominantBaseline="middle"
                    //             style={{
                    //                 fontSize: '20px',
                    //                 fontWeight: 'bold',
                    //                 fill: '#333333',
                    //             }}
                    //         >
                    //             {item2Data.alias}
                    //         </text>
                    //     ),
                    // ]}
                />
            </div>
        </div>
    )
}

export default PieCompare;