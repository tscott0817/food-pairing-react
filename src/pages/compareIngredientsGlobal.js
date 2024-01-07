import React, {useEffect, useState} from "react";
import SharedMoleculesFlavorsCard from "../components/cards/sharedMoleculesFlavorsCard";
import SharedMoleculesCardSingle from "../components/cards/sharedMoleculeCardSingle";
import IngredientCombinedCard from "../components/cards/ingredientCombinedCard";
import ResultsCard from "../components/cards/resultsCard";
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor} from "../colors";
import { FaArrowDown, FaArrowUp, FaArrowRight } from "react-icons/fa";
import CollapsibleComponent from "../components/collapsibleComponent";

const CompareIngredientsGlobal = ({ingredient1, ingredient2}) => {
    const [sharedMolecules, setSharedMolecules] = useState([]);
    const [radarData, setRadarData] = useState(null);
    const [radarData1, setRadarData1] = useState(null);
    const [radarData2, setRadarData2] = useState(null);
    const [ingredientName1, setIngredientName1] = useState('');
    const [ingredientName2, setIngredientName2] = useState('');
    const [fadeIn, setFadeIn] = useState(false);

    const [isMoleculeCardCollapsed, setMoleculeCardCollapsed] = useState(true);
    const [isFlavorCardCollapsed, setFlavorCardCollapsed] = useState(true);
    const [isSuggestedCardCollapsed, setSuggestedCardCollapsed] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // Use the 'entityID' directly from the data
            const entityID1 = ingredient1.entityID || '';
            const entityID2 = ingredient2.entityID || '';

            // // Fetch shared molecules using the entity IDs
            // const responseShared = await fetch(`http://localhost:5000/api/common-molecules/${entityID1}/${entityID2}`);
            // const dataShared = await responseShared.json();
            // setSharedMolecules(dataShared);

            const responseRadar = await fetch(`http://localhost:5000/api/common-data/${entityID1}/${entityID2}`);
            const dataRadar = await responseRadar.json();
            setRadarData(dataRadar.common_data);

            const singleRadarResponse1 = await fetch(`http://localhost:5000/api/flavordb/ingredient-molecules/${entityID1}`);
            const singleRadarData1 = await singleRadarResponse1.json();
            setRadarData1(singleRadarData1);
            setIngredientName1(ingredient1.alias);

            const singleRadarResponse2 = await fetch(`http://localhost:5000/api/flavordb/ingredient-molecules/${entityID2}`);
            const singleRadarData2 = await singleRadarResponse2.json();
            setRadarData2(singleRadarData2);
            setIngredientName2(ingredient2.alias)


            // Get the inersection of radarData1 and radarData2
            // Do this but comparing the column named pubchemID in each array
            // If the both have it, add to the sharedMolecules array
            // TODO: Ugly af
            // Check if both singleRadarData1 and singleRadarData2 are not null before accessing them
            if (singleRadarData1 && singleRadarData2) {
                setIngredientName1(ingredient1.alias);

                // Get the intersection of radarData1 and radarData2
                for (let i = 0; i < singleRadarData1.length; i++) {
                    for (let j = 0; j < singleRadarData2.length; j++) {
                        if (singleRadarData1[i].pubchemID === singleRadarData2[j].pubchemID) {
                            sharedMolecules.push(singleRadarData1[i]);
                        }
                    }
                }
            }


            // Trigger fade-in effect
            setFadeIn(true);
        };

        fetchData(); // Call fetchData when the component mounts
    }, [ingredient1, ingredient2, sharedMolecules, setFadeIn]);


    return (
        <div style={{
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: pageColor,
            width: '100%',
            // minWidth: '900px', // TODO: Make this a proportion of the users screen size instead of hardcoding
            height: '100%',
            margin: '0 auto',
            padding: '20px',
            paddingTop: '20px',
            borderRadius: '8px',
            // border: '1px solid #000',
            // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            overflowY: 'auto',
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity .5s ease-in-out',

        }}>
            <div style={{
                opacity: fadeIn ? 1 : 0,
                transition: 'opacity .5s ease-in-out',
                width: '100%',
                height: '100%',
                marginTop: '2%',

            }}>
                <IngredientCombinedCard ingredient1={ingredient1} ingredient2={ingredient2}/>
                <ResultsCard ingredient1={ingredient1} ingredient2={ingredient2}/>
                <CollapsibleComponent
                    title="Shared Molecules"
                    isCollapsed={isMoleculeCardCollapsed}
                    onToggle={() => setMoleculeCardCollapsed(!isMoleculeCardCollapsed)}
                >
                    {/*<SharedMoleculesCard ingredientName={"Temp"} moleculeData={radarData2}/>*/}
                    {/*TODO: THIS IS THE WRONG DATA*/}
                    {/*<SharedMoleculesCardStacked ingredientName={"Temp"} moleculeData={radarData2}/>  /!*TODO: THIS IS THE WRONG DATA*!/*/}
                    <SharedMoleculesCardSingle ingredientName={"Temp"} moleculeData={radarData2}/>
                    {/*TODO: THIS IS THE WRONG DATA*/}
                </CollapsibleComponent>
                <CollapsibleComponent
                    title="Associated Flavor Profiles"
                    isCollapsed={isFlavorCardCollapsed}
                    onToggle={() => setFlavorCardCollapsed(!isFlavorCardCollapsed)}
                >
                    <SharedMoleculesFlavorsCard moleculeData={radarData}/>
                </CollapsibleComponent>
                <CollapsibleComponent
                    title="Suggested Ingredients"
                    isCollapsed={isSuggestedCardCollapsed}
                    onToggle={() => setSuggestedCardCollapsed(!isSuggestedCardCollapsed)}
                >
                    <h1>Display Other Ingredients With Shared Molecules Here</h1>
                </CollapsibleComponent>
            </div>
        </div>
    );
}

export default CompareIngredientsGlobal;