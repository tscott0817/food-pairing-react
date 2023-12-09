import React, {useState} from 'react';
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor} from "../../colors";

const IngredientThumbnail = ({ingredient}) => {

    const color = getRandomColor();

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                // backgroundColor: color,
                backgroundColor: 'pink',
                marginTop: '60px',
                marginBottom: '10%',
                marginLeft: '15%',
                marginRight: '10%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
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