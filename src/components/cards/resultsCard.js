import React from "react";
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor, randomTempColor2} from "../../colors";
import IngredientCard from "./ingredientCard";


const ResultsCard = ({ingredient1, ingredient2}) => {
    return (
        <div style={{
            display: 'flex',
            borderRadius: '8px',
            marginTop: '1%',
            padding: '1%',
            justifyContent: 'space-between',
            border: '1px solid #000',
            boxSizing: 'border-box',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)'
        }}>
            <div style={{
                fontFamily: 'Roboto, sans-serif',
                backgroundColor: sectionItemColor,
                width: '50%',
                borderRadius: '8px',
                margin: '1%',
                overflow: 'auto',
                fontSize: '1em',
                border: '1px solid #000',
                boxSizing: 'border-box',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            }}>
                <h2>Matching result here</h2>
            </div>
            <div style={{
                fontFamily: 'Roboto, sans-serif',
                backgroundColor: sectionItemColor,
                width: '50%',
                borderRadius: '8px',
                margin: '1%',
                overflow: 'auto',
                fontSize: '1em',
                border: '1px solid #000',
                boxSizing: 'border-box',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            }}>
                <h2>Parameters used in result here</h2>
            </div>
        </div>
    );
}

export default ResultsCard;