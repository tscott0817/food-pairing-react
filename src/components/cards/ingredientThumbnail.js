import React, { useState } from 'react';
import {
    defaultPageNeonColor,
    thumbNailColor,
    thumbNailColorText
} from "../../colors";

const IngredientThumbnail = ({ ingredient_name, ingredient_id, font_size }) => {
    const imageURL = `https://cosylab.iiitd.edu.in/flavordb/static/entities_images/${ingredient_id}.jpg`;
    const capitalizeWords = (str) => str.replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: thumbNailColor,
                display: 'flex',
                flexDirection: 'column', // To stack text and image vertically
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                // border: '1px solid #333333',
                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                boxSizing: 'border-box',
                // paddingLeft: '5%',
                // paddingRight: '5%',
                // paddingTop: '5%',
                paddingLeft: '3%',
                paddingRight: '3%',
                paddingTop: '3%',
                boxShadow: defaultPageNeonColor,
                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                // boxShadow: `0 0 10px rgba(173, 216, 230, 0.8), 0 0 20px rgba(173, 216, 230, 0.6), 0 0 30px rgba(173, 216, 230, 0.4)`,
            }}
        >
            <img
                src={imageURL}
                alt={`Ingredient ${ingredient_name}`}
                style={{
                    width: '100%', // Adjust the width as needed
                    height: '90%', // Adjust the height as needed
                    objectFit: 'cover', // Maintain aspect ratio
                    // borderRadius: '8px',
                    borderRadius: '8px 8px 0 0',

                }}
            />
            <div
                style={{
                    padding: '1%',
                    textAlign: 'center',
                    marginTop: '3%',
                    // backgroundColor: randomTempColor,
                    // fontFamily: 'Crimson Text, serif', fontStyle: 'italic', fontWeight: 'bold',
                    fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: font_size || '1.2em', color: thumbNailColorText,
                }}
            >
                {capitalizeWords(ingredient_name)}
            </div>
        </div>
    );
};

export default IngredientThumbnail;
