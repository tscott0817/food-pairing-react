import React from "react";
import {ResponsivePie} from '@nivo/pie';
import {ResponsiveRadialBar} from '@nivo/radial-bar';
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor, randomTempColor2} from "../../colors";
import IngredientCard from "./ingredientCard";


const ResultsCard = ({ingredient1, ingredient2}) => {
    // TODO: The value should be the percentage of the match
    //  - Maybe show 3 parameters that go into overall rating
    //  - Flavor profile commonality, molecule commonality, and...?
    //      -- weighted ratio of those molecules/flavor profiles per total molecules/flavor profiles of each
    //      -- idk if that makes sense
    const radialBarChartData = [
        {id: 'Match', value: 75},
    ];

    return (
        <div style={{
            display: 'flex',
            backgroundColor: pageSectionColor,
            borderRadius: '8px',
            padding: '2%',
            border: '1px solid #000',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            boxSizing: 'border-box',
            marginTop: '1%',
            marginBottom: '1%',
            width: '100%',
            height: '60%',

        }}>
            <div style={{
                backgroundColor: 'yellow',
                minWidth: '25vw',
                width: '50%',
                height: '100%',
                // margin: '1%',
                marginRight: '1%',
                borderRadius: '8px',
                border: '1px solid #000',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
                // overflow: 'hidden',
            }}>
                <div style={{backgroundColor: 'blue', width: '100%', height: '50%', overflow: 'hidden'}}>
                    <IngredientCard ingredient={ingredient1}/>
                </div>
                <div style={{backgroundColor: 'purple', width: '100%', height: '50%', overflow: 'hidden'}}>
                    <IngredientCard ingredient={ingredient2}/>
                </div>
            </div>
            <div style={{
                backgroundColor: sectionItemColor,
                minWidth: '25vw',
                width: '50%',
                height: '100%',
                // margin: '1%',
                marginLeft: '1%',
                borderRadius: '8px',
                border: '1px solid #000',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
            }}>
                <ResponsiveRadialBar
                    data={radialBarChartData.map((d) => ({...d, data: [{x: d.id, y: d.value, color: '#4CAF50'}]}))}
                    keys={['value']}
                    indexBy="id"
                    maxValue={100}  // Set the maximum value
                    margin={{top: 50, right: 30, bottom: 50, left: 30}}
                    padding={0.3}
                    colors={['#fff']}  // Background color (outline)
                    innerRadius={0.5}
                    startAngle={-180}  // Adjusted to make it a full circle
                    endAngle={180}  // Adjusted to make it a full circle
                    enableGridX={false}
                    enableGridY={false}
                />
            </div>
        </div>
    );
}

export default ResultsCard;