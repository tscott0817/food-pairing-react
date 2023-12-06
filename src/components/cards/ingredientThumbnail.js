import React, {useState} from 'react';

const IngredientThumbnail = ({ingredient}) => {
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const handleIngredientClick = (selected) => {
        // Update the state with the selected molecule
        setSelectedIngredient(selected);
    };
    // You can customize the color based on your preferences or properties of the flavor
    const color = getRandomColor();

    return (
        <div
            style={{
                width: '100px', // Set your desired width
                height: '100px', // Set your desired height
                backgroundColor: color,
                marginTop: '10%', // Set margin as needed
                marginBottom: '10%', // Set margin as needed
                marginLeft: '50%', // Set margin as needed
                marginRight: '10%', // Set margin as needed
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px', // Optional: Add rounded corners
            }}
        >
            {ingredient.alias}
            {/* You can customize the content displayed inside the square */}
        </div>
    );
};

// Function to generate a random color
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export default IngredientThumbnail