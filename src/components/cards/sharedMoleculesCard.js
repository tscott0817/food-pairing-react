import React from "react";


function SharedMoleculesCard({ sharedMolecules }) {
    return (
        <div style={{ backgroundColor: '#fcba03', borderRadius: '8px' }}>
            <h2>Shared Molecule Details</h2>
            {sharedMolecules.length > 0 ? (
                sharedMolecules.map((detail, index) => (
                    <div key={index}>
                        <p>{detail}</p>
                    </div>
                ))
            ) : (
                <p>No Common Molecules</p>
            )}
        </div>
    )
}

export default SharedMoleculesCard;