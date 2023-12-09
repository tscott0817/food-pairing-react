import React, {useState} from "react";
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor} from "../../colors";


// TODO: All of this data will be filled in by pubchem at: https://pubchem.ncbi.nlm.nih.gov/
const IngredientMoleculesCard = ({ingredientName, radarData}) => {
    const [selectedMolecule, setSelectedMolecule] = useState(null);

    const handleMoleculeClick = (selected) => {
        // Update the state with the selected molecule
        setSelectedMolecule(selected);
    };

    if (radarData === null) {
        return <div>No radar data available.</div>;
    }

    return (
        <div style={{display: 'flex', backgroundColor: pageSectionColor, borderRadius: '8px', padding: '1%'}}>
            <div style={{
                fontFamily: 'Roboto, sans-serif',
                backgroundColor: sectionItemColor,
                minWidth: '25vw',
                width: '50%',
                height: '50vh',
                borderRadius: '8px',
                margin: '1%',
                overflow: 'auto',
                fontSize: '1em'
            }}>
                <h2 style={{
                    borderBottom: '1px solid #232b2b',
                    paddingBottom: '0.5em',
                    marginLeft: '5%',
                    width: '90%'
                }}>{ingredientName} Molecule Details</h2>
                {radarData.molecules.length > 0 ? (
                    radarData.molecules.map((detail, index) => (
                        <div key={index} onClick={() => handleMoleculeClick(detail)} style={{cursor: 'pointer'}}>
                            <p>{detail.commonName}</p>
                        </div>
                    ))
                ) : (
                    <p>No Molecules, that doesn't seem right!</p>
                )}
            </div>
            <div style={{
                fontFamily: 'Roboto, sans-serif',
                backgroundColor: sectionItemColor,
                minWidth: '25vw',
                width: '50%',
                height: '50vh',
                borderRadius: '8px',
                margin: '1%',
                overflow: 'auto',
                fontSize: '1em'
            }}>
                {selectedMolecule ? (
                    <div>
                        <h2 style={{
                            borderBottom: '1px solid #232b2b',
                            paddingBottom: '0.5em',
                            marginLeft: '5%',
                            width: '90%'
                        }}>Displaying data for: {selectedMolecule.commonName}</h2>
                        {/* Render all data contents of the selected molecule */}
                        {Object.entries(selectedMolecule).map(([key, value]) => (
                            <div key={key}>
                                <strong>{key}:</strong> {JSON.stringify(value)}
                            </div>
                        ))}
                    </div>
                ) : (
                    <h2 style={{
                        borderBottom: '1px solid #232b2b',
                        paddingBottom: '0.5em',
                        marginLeft: '5%',
                        width: '90%'
                    }}>Click on a molecule to view details</h2>
                )}
            </div>
        </div>
    );
};

export default IngredientMoleculesCard;