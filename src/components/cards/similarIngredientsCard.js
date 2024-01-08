import React, {useState} from "react";
import {sectionItemColor} from "../../colors";


const SimilarIngredientsCard = ({sharedMoleculeCounts}) => {
    const [selectedMolecule, setSelectedMolecule] = useState(null);
    const [moleculeInfo, setMoleculeInfo] = useState(null);
    const [moleculeImage, setMoleculeImage] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    const handleMoleculeClick = async (selected) => {
        const response = await fetch(`http://localhost:5000/api/get_molecule_info/${selected.pubchemID}`);
        const data = await response.json();

        setIsVisible(false); // Start fading out

        const moleculeResponse = await fetch(`http://localhost:5000/api/get_molecule_image/${selected.pubchemID}`);
        console.log("Molecule Image URL:", moleculeResponse.url); // Log the URL
        setMoleculeImage(moleculeResponse.url);

        setTimeout(() => {
            setSelectedMolecule(selected);
            setMoleculeInfo(data.molecule_info);
            setIsVisible(true); // Start fading in
        }, 500);
    };
    if (sharedMoleculeCounts === null) {
        return <div>No molecule data available.</div>;
    }

    return (
        <div
            style={{
                display: 'flex',
                // backgroundColor: 'red',
                height: '100%',
                minHeight: '400px',
                borderRadius: '8px',
                padding: '1%',
                // border: '1px solid #000',
                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                // boxSizing: 'border-box',
                // marginTop: '1%',
                marginBottom: '1%',
            }}
        >
            <div
                style={{
                    // fontFamily: "Roboto, sans-serif",
                    backgroundColor: sectionItemColor,
                    minWidth: "25vw",
                    width: "100%",
                    height: "50vh",
                    minHeight: '400px',
                    // borderTopRightRadius: '8px',
                    // borderBottomRightRadius: '8px',
                    borderRadius: '8px',
                    margin: "1%",
                    paddingTop: "1%",
                    // marginTop: '1%',
                    // marginBottom: '1%',
                    // marginRight: '1%',
                    // overflow: "auto",
                    overflow: "hidden",
                    fontSize: "1em",
                    // border: "1px solid #000",
                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
                    // boxSizing: "border-box",
                    overflowY: "auto",
                }}
            >
                <div style={{
                    columns: '4',
                    columnGap: '20px',
                }}>
                    {sharedMoleculeCounts &&
                        sharedMoleculeCounts
                            .filter(([alias, count]) => count !== 0) // Filter out items with count 0
                            .map(([alias, count]) => (
                                <div key={alias} style={{marginBottom: '10px'}}>
                                    <strong>{alias}:</strong> {count}
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );

}

export default SimilarIngredientsCard;