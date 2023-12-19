import React, {useState} from 'react';
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor, thumbNailColor} from "../../colors";

const IngredientThumbnail = ({ingredient}) => {

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: thumbNailColor,
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

export default IngredientThumbnail