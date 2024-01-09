import React, {useEffect, useState} from "react";
import SharedMoleculesFlavorsCard from "../components/cards/sharedMoleculesFlavorsCard";
import SharedMoleculesCardSingle from "../components/cards/sharedMoleculeCardSingle";
import IngredientCombinedCard from "../components/cards/ingredientCombinedCard";
import ResultsCard from "../components/cards/resultsCard";
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor} from "../colors";
import {FaArrowDown, FaArrowUp, FaArrowRight} from "react-icons/fa";
import CollapsibleComponent from "../components/collapsibleComponent";

// TODO: Prop drilling with ingredient1 and ingredient2
//  - It goes from App.js -> Here -> ResultsCard -> IngredientCard
//  - Need to use CONTEXT instead to make the ingredients global values
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

            try {
                // Fetch shared molecules using the entity IDs
                const responseShared = await fetch(`http://localhost:5000/api/get_shared_molecules/${entityID1}/${entityID2}`);
                const dataShared = await responseShared.json();

                if (responseShared.ok) {
                    // Update the state with the fetched shared molecules
                    setSharedMolecules(dataShared);
                } else {
                    console.error(`Failed to fetch shared molecules: ${dataShared.message}`);
                }
            } catch (error) {
                console.error("Error fetching shared molecules:", error);
            }

            // Fetch other data and update the state as needed
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
            setIngredientName2(ingredient2.alias);

            // Trigger fade-in effect
            setFadeIn(true);
        };

        fetchData(); // Call fetchData when the component mounts
    }, [ingredient1, ingredient2, setFadeIn, setSharedMolecules, setRadarData, setRadarData1, setRadarData2]);


    return (
        <div style={{
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: pageColor,
            // backgroundColor: 'blue',
            width: '100%',
            // minWidth: '900px', // TODO: Make this a proportion of the users screen size instead of hardcoding
            height: '100%',
            margin: '0 auto',
            // padding: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            // paddingLeft: '1%',
            // padingRight: '1%',
            borderRadius: '8px',
            // border: '1px solid #000',
            // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            overflowY: 'hidden',
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity .3s ease-in-out',

        }}>
            <div style={{
                // backgroundColor: 'red',
            }}>
                <IngredientCombinedCard ingredient1={ingredient1} ingredient2={ingredient2}/>
                <hr
                    className="separator"
                    style={{
                        // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', // Adjust values as needed
                        border: 'none',
                        borderTop: '1px solid #ccc',
                    }}
                />
            </div>
            <div style={{
                opacity: fadeIn ? 1 : 0,
                transition: 'opacity .5s ease-in-out',
                width: '100%',
                height: '100%',
                // marginTop: '1%',
                // backgroundColor: 'yellow',
                overflowY: 'auto',
                padding: '1%',
                // paddingTop: '2%',
                paddingBottom: '10%',
                overflow: 'auto',
            }}>
                <ResultsCard ingredient1={ingredient1} ingredient2={ingredient2} sharedMolecules={sharedMolecules}/>
                <CollapsibleComponent
                    title="Shared Molecules"
                    isCollapsed={isMoleculeCardCollapsed}
                    onToggle={() => setMoleculeCardCollapsed(!isMoleculeCardCollapsed)}
                >
                    {/*<SharedMoleculesCard ingredientName={"Temp"} moleculeData={radarData2}/>*/}
                    {/*TODO: THIS IS THE WRONG DATA*/}
                    {/*<SharedMoleculesCardStacked ingredientName={"Temp"} moleculeData={radarData2}/>  /!*TODO: THIS IS THE WRONG DATA*!/*/}
                    <SharedMoleculesCardSingle ingredientName={"Temp"} moleculeData={sharedMolecules}/>
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