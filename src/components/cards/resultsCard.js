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
    const color1 = '#4CAF50';
    const color2 = '#2196F3';
    const color3 = '#FFC107';

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
            minHeight: '250px',

        }}>
            <div style={{
                backgroundColor: sectionItemColor,
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
            </div>
            <div style={{
                // backgroundColor: 'red',
                minWidth: '25vw',
                width: '50%',
                height: '100%',
                // margin: '1%',
                marginLeft: '1%',
                borderRadius: '8px',
                border: '1px solid #000',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ResponsiveRadialBar
                    data={[
                        {
                            // id: 'Result 1',
                            data: [{x: 'Jaccard', y: 75}],
                        },
                        {
                            // id: 'Result 2',
                            data: [{x: 'Cos', y: 50}],
                        },
                        {
                            // id: 'Result 3',
                            data: [{x: 'Euclidean', y: 20}],
                        },
                    ]}
                    keys={['value']}
                    indexBy="id"
                    innerRadius={0.5}
                    startAngle={-180}  // Adjusted to make it a full circle
                    endAngle={180}  // Adjusted to make it a full circle
                    enableGridX={false}
                    enableGridY={false}
                    valueFormat=">-.2f"
                    padding={0.4}
                    maxValue={100}
                    cornerRadius={2}
                    margin={{top: 40, right: 0, bottom: 40, left: 0}}
                    radialAxisStart={{tickSize: 5, tickPadding: 5, tickRotation: 0}}
                    circularAxisOuter={{tickSize: 5, tickPadding: 12, tickRotation: 0}}
                    legends={[
                        {
                            anchor: 'top-left',
                            direction: 'column',
                            justify: false,
                            translateX: 10,
                            translateY: -25,
                            itemsSpacing: 6,
                            itemDirection: 'left-to-right',
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            symbolSize: 18,
                            symbolShape: 'square',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                    colors={{scheme: 'nivo'}}
                />
                <div style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)'}}>
                    <p>75%</p>
                </div>
            </div>
        </div>
    );
}

export default ResultsCard;