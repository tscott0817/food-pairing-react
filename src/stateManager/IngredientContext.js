import {createContext, useContext, useReducer} from 'react';

const IngredientContext = createContext();

const ingredientReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_INGREDIENT':
            return [...state, action.payload];
        case 'UNSELECT_INGREDIENT':
            return state.filter(ingredient => ingredient !== action.payload);
        default:
            return state;
    }
};

const IngredientProvider = ({children}) => {
    const [selectedIngredients, dispatch] = useReducer(ingredientReducer, []);

    const selectIngredient = (ingredient) => {
        // Check if the limit of two ingredients is reached
        if (selectedIngredients.length < 2) {
            // Check if the ingredient is not already in the selectedIngredients array
            if (!selectedIngredients.includes(ingredient)) {
                // Dispatch the action to update the state
                dispatch({type: 'SELECT_INGREDIENT', payload: ingredient});
            } else {
                console.log('Ingredient is already selected.');
            }
        } else {
            console.log('Maximum limit of two ingredients reached. Remove one to add another.');
        }
    };

    const unselectIngredient = (ingredient) => {
        dispatch({type: 'UNSELECT_INGREDIENT', payload: ingredient});
    };

    return (
        <IngredientContext.Provider
            value={{selectedIngredients, selectIngredient, unselectIngredient}}
        >
            {children}
        </IngredientContext.Provider>
    );
};

const useIngredientContext = () => {
    const context = useContext(IngredientContext);
    if (!context) {
        throw new Error('useIngredientContext must be used within an IngredientProvider');
    }
    return context;
};

export {IngredientProvider, useIngredientContext};