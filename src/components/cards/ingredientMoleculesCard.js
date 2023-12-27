import React, {useState} from "react";
import {windowColor, pageSectionColor, sectionItemColor} from "../../colors";

const IngredientMoleculesCard = ({ingredientName, moleculeData}) => {
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
                backgroundColor: pageSectionColor,
                borderRadius: '8px',
                padding: '1%',
                border: '1px solid #000',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
                marginTop: '1%',
                marginBottom: '1%',
            }}
        >
            <div
                style={{
                    fontFamily: 'Roboto, sans-serif',
                    backgroundColor: sectionItemColor,
                    minWidth: '25vw',
                    width: '50%',
                    height: '50vh',
                    borderRadius: '8px',
                    margin: '1%',
                    overflow: 'auto',
                    fontSize: '1em',
                    border: '1px solid #000',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    boxSizing: 'border-box',
                }}
            >
                <h2
                    style={{
                        borderBottom: '1px solid #232b2b',
                        paddingBottom: '0.5em',
                        marginLeft: '5%',
                        width: '90%',
                    }}
                >
                    Molecule
                    Details: {ingredientName && ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1)}
                </h2>
                {moleculeData.molecules.length > 0 ? (
                    moleculeData.molecules.map((detail, index) => (
                        <div key={index} onClick={() => handleMoleculeClick(detail)} style={{cursor: 'pointer'}}>
                            <p>{detail.commonName}</p>
                        </div>
                    ))
                ) : (
                    <p>No Molecules, that doesn't seem right!</p>
                )}
            </div>
            <div
                style={{
                    fontFamily: 'Roboto, sans-serif',
                    backgroundColor: sectionItemColor,
                    minWidth: '25vw',
                    width: '50%',
                    height: '50vh',
                    borderRadius: '8px',
                    margin: '1%',
                    overflow: 'auto',
                    fontSize: '1em',
                    border: '1px solid #000',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    boxSizing: 'border-box',
                }}
            >
                {selectedMolecule ? (
                    <div>
                        <h2
                            style={{
                                borderBottom: '1px solid #232b2b',
                                paddingBottom: '0.5em',
                                marginLeft: '5%',
                                width: '90%',
                            }}
                        >
                            Displaying data for: {selectedMolecule.commonName}
                        </h2>
                        {/* Render all data contents of the selected molecule */}
                        {Object.entries(moleculeInfo.Properties).map(([key, value]) => (
                            <div key={key} style={{backgroundColor: 'yellow'}}>
                                <strong>{key}:</strong>{' '}
                                {typeof value === 'object' ? JSON.stringify(value) : value}
                            </div>
                        ))}
                        {/* Display the image */}
                        {moleculeImage && (
                            <img
                                src={moleculeImage}
                                alt={`Molecule: ${selectedMolecule.commonName}`}
                                style={{marginTop: '1em', backgroundColor: 'blue', padding: '10px'}}
                            />
                        )}
                    </div>
                ) : (
                    <h2
                        style={{
                            borderBottom: '1px solid #232b2b',
                            paddingBottom: '0.5em',
                            marginLeft: '5%',
                            width: '90%',
                        }}
                    >
                        Click on a molecule to view details
                    </h2>
                )}
            </div>
        </div>
    );
};

export default IngredientMoleculesCard;
