import React, { useState } from 'react';
import {
    defaultPageNeonColor,
    thumbNailColor,
    thumbNailColorText
} from "../../colors";

const IngredientThumbnail = ({ ingredient }) => {
    // Construct the image URL based on the entityID
    const imageURL = `https://cosylab.iiitd.edu.in/flavordb/static/entities_images/${ingredient.entityID}.jpg`;

    // Capitalize the first letter of each word
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
                paddingLeft: '3%',
                paddingRight: '3%',
                boxShadow: defaultPageNeonColor,
                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                // boxShadow: `0 0 10px rgba(173, 216, 230, 0.8), 0 0 20px rgba(173, 216, 230, 0.6), 0 0 30px rgba(173, 216, 230, 0.4)`,
            }}
        >
            <img
                src={imageURL}
                alt={`Ingredient ${ingredient.alias}`}
                style={{
                    width: '100%', // Adjust the width as needed
                    height: '80%', // Adjust the height as needed
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
                    fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: '1.2em', color: thumbNailColorText,
                }}
            >
                {capitalizeWords(ingredient.alias)}
            </div>
        </div>
    );
};

export default IngredientThumbnail;
