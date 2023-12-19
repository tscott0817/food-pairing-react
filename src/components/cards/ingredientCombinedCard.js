import IngredientCard from './ingredientCard';
import {pageSectionColor, randomTempColor2, sectionItemColor} from "../../colors";


const IngredientCombinedCard = ({ingredient1, ingredient2}) => {
    return (
        <div style={{
            display: 'flex',
            backgroundColor: pageSectionColor,
            borderRadius: '8px',
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
                <IngredientCard ingredient={ingredient1}/>
            </div>
            <div style={{
                fontFamily: 'Arial, sans-serif',
                backgroundColor: sectionItemColor,
                width: '4%',
                borderRadius: '8px',
                margin: '1%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5em',
                fontWeight: 'bold',
                color: 'white',
                border: '1px solid #000',
                boxSizing: 'border-box',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            }}>VS
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
                <IngredientCard ingredient={ingredient2}/>
            </div>
        </div>
    );
};


export default IngredientCombinedCard;