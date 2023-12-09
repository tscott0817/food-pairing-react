import React from "react";
import {ResponsivePie} from '@nivo/pie';
import {ResponsiveRadialBar} from '@nivo/radial-bar';
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor, randomTempColor2} from "../../colors";
import IngredientCard from "./ingredientCard";


const ResultsCard = ({ingredient1, ingredient2}) => {

    const pieChartData = [
        {id: 'Category 1', label: 'Category 1', value: 25, color: '#FF5733'},
        {id: 'Category 2', label: 'Category 2', value: 30, color: '#33FF57'},
        {id: 'Category 3', label: 'Category 3', value: 20, color: '#5733FF'},
        {id: 'Category 4', label: 'Category 4', value: 25, color: '#33B8FF'},
    ];

    // TODO: The value should be the percentage of the match
    const radialBarChartData = [
        {id: 'Match', value: 75},
    ];

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
                <h2>Details here:</h2>
            </div>
        </div>
    );
}

export default ResultsCard;