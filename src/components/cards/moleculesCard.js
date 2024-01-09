import React, {useState} from "react";
import {sectionItemColor} from "../../colors";


const MoleculesCard = ({ingredientName, moleculeData}) => {
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
    if (moleculeData === null) {
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
                    // fontFamily: 'Roboto, sans-serif',
                    // backgroundColor: 'pink',
                    minWidth: '250px',
                    maxWidth: '20vw',
                    height: '400px',
                    // minHeight: '400px',
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    // margin: '1%',
                    marginTop: '1%',
                    marginBottom: '1%',
                    marginLeft: '1%',
                    // padding: '1%',
                    overflow: 'hidden',
                    fontSize: '1em',
                    // border: '1px solid #000',
                    // borderRight: '1px solid #000',
                    // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    borderRight: '1px solid #999',
                    // boxSizing: 'border-box',
                    textAlign: 'left',
                    zIndex: 1,
                }}
            >
                <div style={{
                    // backgroundColor: 'blue',
                    // marginTop: '30px',
                    // marginTop: '5%',
                }}>
                    <h2
                        style={{
                            borderBottom: '1px solid #999',
                            marginLeft: '2.5%',
                            width: '95%',
                            // marginBottom: '10px',
                            textAlign: 'center',
                            // backgroundColor: 'red'
                        }}
                    >
                        Molecules
                    </h2>
                </div>
                <div style={{
                    // backgroundColor: 'green',
                    overflow: 'auto',
                    // height: '93%',
                    height: '370px',
                    // paddingTop: '10px',
                    padding: '5%',
                    // borderRight: '1px solid #232b2b',
                    // paddingBottom: '50px',
                }}>
                    {moleculeData.molecules.length > 0 ? (
                        moleculeData.molecules.map((detail, index) => (
                            <div key={index} onClick={() => handleMoleculeClick(detail)} style={{cursor: 'pointer', marginBottom: '10px', textAlign: 'center'}}>
                                <p>{detail.commonName}</p>
                            </div>
                        ))
                    ) : (
                        <p>No Molecules!</p>
                    )}
                </div>
            </div>
            <div
                style={{
                    // fontFamily: "Roboto, sans-serif",
                    // backgroundColor: sectionItemColor,
                    // backgroundColor: 'red',
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
                    // borderLeft: '1px solid #232b2b',
                    // border: "1px solid #000",
                    // boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
                    // boxSizing: "border-box",
                }}
            >
                {selectedMolecule ? (
                    <div>
                        <h2
                            style={{
                                borderBottom: "1px solid #999",
                                // paddingBottom: "0.5em",
                                marginLeft: "1%",
                                width: "98%",
                            }}
                        >
                            Viewing Molecule: {selectedMolecule.commonName}
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
                                paddingTop: '2%',
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
                                <div style={{
                                    marginTop: '5%',
                                }}>
                                    <strong>Flavor Profiles:</strong>
                                    {selectedMolecule.flavorProfile.map((flavor, index) => (
                                        // <span key={index}>{flavor}</span>
                                        <div>
                                            <p>- {flavor}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{
                                // backgroundColor: 'red',
                                padding: '2%',
                                display: 'flex',
                                marginLeft: '15%',
                                marginTop: '15px',
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
                                        alt={`Molecule: ${selectedMolecule.commonName}`}
                                        style={{
                                            width: '225px',
                                            height: '225px',
                                            borderRadius: 8,
                                            boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                                        }}
                                    />
                                )}

                                {/* Link under the image */}
                                <div style={{marginTop: '10px'}}>
                                    {/*<a*/}
                                    {/*    href={`https://pubchem.ncbi.nlm.nih.gov/compound/${moleculeInfo.PubChemID}`}*/}
                                    {/*    target="_blank"*/}
                                    {/*    rel="noopener noreferrer"*/}
                                    {/*>*/}
                                    {/*    View on PubChem*/}
                                    {/*</a>*/}
                                    {/* Button under the image */}
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

export default MoleculesCard;
