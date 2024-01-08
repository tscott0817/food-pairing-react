import React from "react";
import {ResponsivePie} from '@nivo/pie';
import {ResponsiveRadialBar} from '@nivo/radial-bar';
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor, randomTempColor2} from "../../colors";
import IngredientCard from "./ingredientCard";


// TODO: This component suffers from "Prop drilling"
//  - Meaning that ingredient1, and ingredient 2 are not used in this component
//  - but are passed from the parent component, through this one, and into IngredientCard.
//  - Causes too tight of a coupling between these 4 components
const ResultsCard = ({ingredient1, ingredient2, sharedMolecules}) => {
    // TODO: The value should be the percentage of the match
    //  - Maybe show 3 parameters that go into overall rating
    //  - Flavor profile commonality, molecule commonality, and...?
    //      -- weighted ratio of those molecules/flavor profiles per total molecules/flavor profiles of each
    //      -- idk if that makes sense
    const color1 = '#4CAF50';
    const color2 = '#2196F3';
    const color3 = '#FFC107';
    const finalScore = 75;
    console.log(ingredient1)
    console.log(ingredient2)

    const ingredient1MoleculeCount = getMoleculesCount({ingredient: ingredient1});
    const ingredient2MoleculeCount = getMoleculesCount({ingredient: ingredient2});
    const moleculesCount = ingredient1MoleculeCount + ingredient2MoleculeCount;

    return (
        <div style={{
            display: 'flex',
            // backgroundColor: pageSectionColor,
            borderRadius: '8px',
            padding: '2%',
            marginLeft: '2%',
            // border: '1px solid #000',
            // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            // boxSizing: 'border-box',
            marginTop: '1%',
            marginBottom: '1%',
            width: '96%',
            height: '60%',
            minHeight: '350px',

        }}>
            <div style={{
                // backgroundColor: 'yellow',
                minWidth: '25vw',
                width: '50%',
                height: '100%',
                // margin: '1%',
                marginRight: '1%',
                borderRadius: '8px',
                // border: '1px solid #000',
                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                // boxSizing: 'border-box',
                // overflow: 'hidden',
                // overflow: 'hidden',
                // display: 'flex',
            }}>
                {/*<div style={{*/}
                {/*    // backgroundColor: 'blue',*/}
                {/*    display: 'flex',*/}
                {/*    marginBottom: '50px',*/}
                {/*}}>*/}
                {/*    <div style={{*/}
                {/*        fontFamily: 'Roboto, sans-serif',*/}
                {/*        // backgroundColor: 'red',*/}
                {/*        width: '50%',*/}
                {/*        // height: '40%',*/}
                {/*        // borderRadius: '8px',*/}
                {/*        // margin: '1%',*/}
                {/*        overflow: 'hidden',*/}
                {/*        // fontSize: '1em',*/}
                {/*        // border: '1px solid #000',*/}
                {/*        // boxSizing: 'border-box',*/}
                {/*        // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',*/}
                {/*    }}>*/}
                {/*        <IngredientCard ingredient={ingredient1}/>*/}
                {/*    </div>*/}
                {/*    <div style={{*/}
                {/*        fontFamily: 'Roboto, sans-serif',*/}
                {/*        // backgroundColor: 'red',*/}
                {/*        width: '50%',*/}
                {/*        height: '40%',*/}
                {/*        // borderRadius: '8px',*/}
                {/*        // margin: '1%',*/}
                {/*        overflow: 'hidden',*/}
                {/*        // fontSize: '1em',*/}
                {/*        // border: '1px solid #000',*/}
                {/*        // boxSizing: 'border-box',*/}
                {/*        // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',*/}
                {/*    }}>*/}
                {/*        <IngredientCard ingredient={ingredient2}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div style={{
                    // backgroundColor: 'green',
                    height: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        marginBottom: '25px',
                    }}>
                        <p><strong>Total Combined Flavor Molecules</strong></p>
                        <p style={{color: '#555'}}>{ingredient1MoleculeCount} {ingredient1.alias} + {ingredient2MoleculeCount} {ingredient2.alias} = {moleculesCount} total
                            molecules</p>
                    </div>
                    <div style={{
                        // marginBottom: '50px',
                    }}>
                        <p><strong>Number of Shared Flavor Molecules</strong></p>
                        <p style={{color: '#555'}}>{sharedMolecules.length}</p>
                    </div>
                </div>
            </div>
            <div style={{
                // backgroundColor: 'red',
                minWidth: '25vw',
                width: '50%',
                height: '100%',
                // margin: '1%',
                marginLeft: '1%',
                borderRadius: '8px',
                // border: '1px solid #000',
                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                // boxSizing: 'border-box',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ResponsiveRadialBar
                    data={[
                        {
                            id: 'Result 1',
                            data: [{x: 'Jaccard', y: 75}],
                        },
                        {
                            id: 'Result 2',
                            data: [{x: 'Cos', y: 50}],
                        },
                        {
                            id: 'Result 3',
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
                            translateX: 0,
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
                <div style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', color: '#777'}}>
                    <p>{finalScore}%</p>
                </div>
            </div>
        </div>
    );
}

const getMoleculesCount = ({ingredient}) => {
    // Convert the string representation of the set to a JavaScript array
    const moleculesArray = ingredient.molecules
        .replace(/{/g, '[')
        .replace(/}/g, ']')
        .replace(/'/g, '"');

    // Parse the array
    const moleculesSet = new Set(JSON.parse(moleculesArray));

    // Get the size of the set
    return moleculesSet.size;
}

export default ResultsCard;