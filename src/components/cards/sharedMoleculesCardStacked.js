import React, {useState} from "react";
import {pageSectionColor, sectionItemColor} from "../../colors";

const SharedMoleculesCardStacked = ({ingredientName, moleculeData}) => {
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
                display: "flex",
                flexDirection: "column", // Set flexDirection to 'column'
                backgroundColor: pageSectionColor,
                borderRadius: "8px",
                padding: "2%",
                border: "1px solid #000",
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
                boxSizing: "border-box",
                marginBottom: "1%", // Remove marginTop
            }}
        >
            <div
                style={{
                    fontFamily: "Roboto, sans-serif",
                    backgroundColor: sectionItemColor,
                    minWidth: "25vw",
                    width: "100%",
                    borderRadius: "8px",
                    overflowY: "auto", // Enable vertical scrolling if needed
                    fontSize: "1em",
                    border: "1px solid #000",
                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h2
                    style={{
                        borderBottom: "1px solid #232b2b",
                        paddingBottom: "0.5em",
                        marginLeft: "5%",
                        width: "90%",
                    }}
                >
                    All Shared Molecules
                </h2>
                <div
                    style={{
                        columnCount: 4, // Set the number of columns
                        columnGap: "1em", // Adjust the gap between columns
                        padding: "0.5em", // Add padding for better spacing
                    }}
                >
                    {moleculeData.molecules.length > 0 ? (
                        moleculeData.molecules.map((detail, index) => (
                            <div key={index} onClick={() => handleMoleculeClick(detail)}
                                 style={{cursor: "pointer", marginBottom: "0.5em"}}>
                                <p>{detail.commonName}</p>
                            </div>
                        ))
                    ) : (
                        <p>No Molecules In Common!</p>
                    )}
                </div>
            </div>
            <div
                style={{
                    fontFamily: "Roboto, sans-serif",
                    backgroundColor: sectionItemColor,
                    minWidth: "25vw",
                    width: "100%",
                    height: "50vh",
                    borderRadius: "8px",
                    // margin: "1%",
                    marginTop: "2%",
                    overflow: "auto",
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
                                paddingBottom: "0.5em",
                                marginLeft: "5%",
                                width: "90%",
                            }}
                        >
                            Displaying data for: {selectedMolecule.commonName}
                        </h2>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{backgroundColor: 'yellow', overflow: 'auto'}}>
                                {/* Render all data contents of the selected molecule */}
                                {Object.entries(moleculeInfo.Properties).map(([key, value]) => (
                                    <div key={key} style={{}}>
                                        <strong>{key}:</strong>{" "}
                                        {typeof value === "object" ? JSON.stringify(value) : value}
                                    </div>
                                ))}
                            </div>
                            <div style={{backgroundColor: 'blue'}}>
                                {/* Display the image */}
                                {moleculeImage && (
                                    <img
                                        src={moleculeImage}
                                        alt={`Molecule: ${selectedMolecule.commonName}`}
                                        style={{marginTop: "1em", padding: "10px"}}
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

export default SharedMoleculesCardStacked;
