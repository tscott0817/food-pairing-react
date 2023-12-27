import React, {useState} from "react";
import {pageSectionColor, sectionItemColor} from "../../colors";

const SharedMoleculesCardSingle = ({ingredientName, moleculeData}) => {
    const [selectedMolecule, setSelectedMolecule] = useState(null);
    const [moleculeInfo, setMoleculeInfo] = useState(null);
    const [moleculeImage, setMoleculeImage] = useState(null);

    const handleMoleculeClick = async (selected) => {
        const response = await fetch(`http://localhost:5000/api/get_molecule_info/${selected.pubchemID}`);
        const data = await response.json();
        setSelectedMolecule(selected);
        setMoleculeInfo(data.molecule_info);

        const moleculeResponse = await fetch(`http://localhost:5000/api/get_molecule_image/${selected.pubchemID}`);
        console.log("Molecule Image URL:", moleculeResponse.url); // Log the URL
        setMoleculeImage(moleculeResponse.url);
    };

    if (moleculeData === null) {
        return <div>No molecule data available.</div>;
    }

    return (
        <div
            style={{
                display: 'flex',
                backgroundColor: 'red',
                height: '100%',
                borderRadius: '8px',
                padding: '1%',
                border: '1px solid #000',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
                // marginTop: '1%',
                marginBottom: '1%',
            }}
        >
            <div
                style={{
                    fontFamily: 'Roboto, sans-serif',
                    backgroundColor: sectionItemColor,
                    minWidth: '250px',
                    maxWidth: '20vw',
                    // width: '25%',
                    height: '50vh',
                    // borderRadius: '8px',
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    // margin: '1%',
                    marginTop: '1%',
                    marginBottom: '1%',
                    marginLeft: '1%',
                    padding: '1%',
                    overflow: 'auto',
                    fontSize: '1em',
                    border: '1px solid #000',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    boxSizing: 'border-box',
                    textAlign: 'left',
                }}
            >
                <h2
                    style={{
                        borderBottom: '1px solid #232b2b',
                        marginLeft: '2.5%',
                        width: '95%',
                        marginBottom: '10px',
                    }}
                >
                    All Shared Molecules
                </h2>
                {moleculeData.molecules.length > 0 ? (
                    moleculeData.molecules.map((detail, index) => (
                        <div key={index} onClick={() => handleMoleculeClick(detail)} style={{cursor: 'pointer'}}>
                            <p>- {detail.commonName}</p>
                        </div>
                    ))
                ) : (
                    <p>No Molecules In Common!</p>
                )}
            </div>
            <div
                style={{
                    fontFamily: "Roboto, sans-serif",
                    backgroundColor: sectionItemColor,
                    minWidth: "25vw",
                    width: "100%",
                    height: "50vh",
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    // margin: "1%",
                    marginTop: '1%',
                    marginBottom: '1%',
                    marginRight: '1%',
                    overflow: "hidden",
                    fontSize: "1em",
                    border: "1px solid #000",
                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
                    boxSizing: "border-box",
                }}
            >
                {selectedMolecule ? (
                    <div>
                        <h2
                            style={{
                                borderBottom: "1px solid #232b2b",
                                // paddingBottom: "0.5em",
                                marginLeft: "5%",
                                width: "90%",
                            }}
                        >
                            Displaying data for: {selectedMolecule.commonName}
                        </h2>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            {/*<div style={{backgroundColor: 'yellow', overflow: 'hidden', textAlign: 'left', padding: '1%'}}>*/}
                            <div style={{overflow: 'hidden', textAlign: 'left', padding: '1%'}}>
                                {/* Render all data contents of the selected molecule */}
                                {Object.entries(moleculeInfo.Properties).map(([key, value]) => (
                                    <div key={key} style={{}}>
                                        <strong>{key}:</strong>{" "}
                                        {typeof value === "object" ? JSON.stringify(value) : value}
                                    </div>
                                ))}
                            </div>
                            {/*<div style={{backgroundColor: 'blue'}}>*/}
                            <div style={{backgroundColor: 'blue', padding: '1%', marginRight: '1%'}}>
                                {/* Display the image */}
                                {moleculeImage && (
                                    <img
                                        src={moleculeImage}
                                        alt={`Molecule: ${selectedMolecule.commonName}`}
                                        style={{}}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <h2
                        style={{
                            borderBottom: "1px solid #232b2b",
                            paddingBottom: "0.5em",
                            marginLeft: "5%",
                            width: "90%",
                        }}
                    >
                        Click on a molecule to view details
                    </h2>
                )}
            </div>
        </div>
    );
};

export default SharedMoleculesCardSingle;
