import React, {useState} from "react";
import {pageSectionColor, sectionItemColor} from "../../colors";

// TODO: Need to remove the hardcoding of the molecule array [0]...
//  - The JSON returned is not that great, but my backend sucks so
const SharedMoleculesCardSingle = ({ingredientName, moleculeData}) => {
    const [selectedMolecule, setSelectedMolecule] = useState(null);
    const [moleculeInfo, setMoleculeInfo] = useState(null);
    const [moleculeImage, setMoleculeImage] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    const handleMoleculeClick = async (selected) => {
        const response = await fetch(`http://localhost:5000/api/get_molecule_info/${selected[1]}`);
        const data = await response.json();

        setIsVisible(false); // Start fading out

        const moleculeResponse = await fetch(`http://localhost:5000/api/get_molecule_image/${selected[1]}`);
        console.log("Molecule Image URL:", moleculeResponse.url); // Log the URL
        setMoleculeImage(moleculeResponse.url);

        setTimeout(() => {
            setSelectedMolecule(selected);
            setMoleculeInfo(data.molecule_info);
            setIsVisible(true); // Start fading in
        }, 500);
    };
    if (moleculeData === null) {
        return <div>No molecule data available.</div>;
    }

    return (
        <div
            style={{
                display: 'flex',
                // backgroundColor: 'red',
                width: '100%',
                height: '100%',
                minHeight: '400px',
                borderRadius: '8px',
                padding: '1%',
                marginBottom: '1%',
            }}
        >
            <div
                style={{
                    // fontFamily: 'Roboto, sans-serif',
                    backgroundColor: sectionItemColor,
                    minWidth: '250px',
                    maxWidth: '20vw',
                    height: '50vh',
                    minHeight: '400px',
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    // margin: '1%',
                    marginTop: '1%',
                    marginBottom: '1%',
                    marginLeft: '1%',
                    padding: '1%',
                    overflow: 'auto',
                    fontSize: '1em',
                    // border: '1px solid #000',
                    // borderRight: '1px solid #000',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    textAlign: 'left',
                    zIndex: 1,
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
                    Molecules
                </h2>
                {moleculeData.length > 0 ? (
                    moleculeData.map((detail, index) => (
                        <div key={index} onClick={() => handleMoleculeClick(detail)}
                             style={{cursor: 'pointer', marginBottom: '10px'}}>
                            <p>{detail[2]}</p>
                        </div>
                    ))
                ) : (
                    <p>No Molecules!</p>
                )}
            </div>
            <div
                style={{
                    // fontFamily: "Roboto, sans-serif",
                    backgroundColor: sectionItemColor,
                    minWidth: "25vw",
                    width: "100%",
                    height: "50vh",
                    minHeight: '400px',
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    // margin: "1%",
                    marginTop: '1%',
                    marginBottom: '1%',
                    marginRight: '1%',
                    // overflow: "auto",
                    overflow: "hidden",
                    fontSize: "1em",
                    // border: "1px solid #000",
                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
                    // boxSizing: "border-box",
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
                            Displaying data for: {selectedMolecule[2]}
                        </h2>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            // backgroundColor: 'yellow'
                        }}>
                            <div style={{
                                // backgroundColor: 'yellow',
                                overflow: 'hidden',
                                textAlign: 'left',
                                padding: '2%',
                                opacity: isVisible ? 1 : 0, // Set opacity based on visibility flag
                                transition: "opacity 0.5s ease",
                                // border: '1px solid #000',
                                // borderRadius: '8px',
                                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                                marginLeft: '8%',
                                marginTop: '10px',
                                // marginTop: '3%',
                            }}>
                                <div style={{
                                    // marginTop: '1%',
                                }}>
                                    <strong>PubChemID:</strong> {moleculeInfo.PubChemID}
                                </div>
                                {/*<div><strong>Molecular Formula:</strong> {moleculeInfo.Properties["Molecular Formula"].sval}</div>*/}
                                <div style={{
                                    marginTop: '5%',
                                }}>
                                    <strong>Molecular Formula:</strong>{" "}
                                    {moleculeInfo.Properties["Molecular Formula"].sval.split("").map((char, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                verticalAlign: /\d/.test(char) ? "sub" : "baseline",
                                                fontSize: /\d/.test(char) ? "75%" : "100%",
                                            }}
                                        >
                                          {char}
                                        </span>
                                    ))}
                                </div>
                                <div style={{
                                    marginTop: '5%',
                                }}>
                                    <strong>Molecular
                                        Weight:</strong> {moleculeInfo.Properties["Molecular Weight"].sval} g/mol
                                </div>
                                <div style={{marginTop: '5%'}}>
                                    <strong>Flavor Profiles:</strong>
                                    {selectedMolecule[3]
                                        .slice(1, -1)
                                        .split(',')
                                        .map((flavor, index) => (
                                            <div key={index}>
                                                <p>- {flavor.trim().replace(/'/g, '')}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div style={{
                                // backgroundColor: 'red',
                                padding: '2%',
                                display: 'flex',
                                marginLeft: '10%',
                                marginTop: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',  // Stack the items vertically
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 0.5s ease",
                            }}>
                                {/* Display the image */}
                                {moleculeImage && (
                                    <img
                                        src={moleculeImage}
                                        alt={`Molecule: ${selectedMolecule[2]}`}
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            borderRadius: 8,
                                            boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                                        }}
                                    />
                                )}
                                <div style={{marginTop: '10px'}}>
                                    <button
                                        style={{
                                            marginTop: '40px',
                                            padding: '10px',
                                            backgroundColor: 'blue',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => window.open(`https://pubchem.ncbi.nlm.nih.gov/compound/${moleculeInfo.PubChemID}`, '_blank')}
                                    >
                                        View on PubChem
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h2
                        style={{
                            position: 'relative',
                            top: '50%',
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
