import React, {useState} from 'react';
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor, thumbNailColor} from "../../colors";

const IngredientThumbnail = ({ingredient}) => {

    const color = getRandomColor();

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                // backgroundColor: color,
                backgroundColor: thumbNailColor,
                // marginTop: '60px',
                // marginBottom: '10%',
                // marginLeft: '15%',
                // marginRight: '10%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                border: '1px solid #000',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
            }}
        >
            {ingredient.alias}
        </div>
    );
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export default IngredientThumbnail