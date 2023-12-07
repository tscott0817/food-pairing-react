import IngredientCard from './ingredientCard';


const IngredientCombinedCard = ({ingredient1, ingredient2}) => {
return (
  <div style={{
      display: 'flex',
      backgroundColor: '#fcba03',
      borderRadius: '8px',
      padding: '1%',
      justifyContent: 'space-between'
  }}>
      <div style={{
          fontFamily: 'Roboto, sans-serif',
          backgroundColor: 'green',
          width: '50%',
          borderRadius: '8px',
          margin: '1%',
          overflow: 'auto',
          fontSize: '1em'
      }}>
          {/* Place IngredientCard component here */}
          <IngredientCard ingredient={ingredient1}/>
      </div>
      <div style={{
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#fcba03',
          width: '4%',
          borderRadius: '8px',
          margin: '1%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5em',
          fontWeight: 'bold',
          color: 'white'
      }}>VS</div>
      <div style={{
          fontFamily: 'Roboto, sans-serif',
          backgroundColor: 'green',
          width: '50%',
          borderRadius: '8px',
          margin: '1%',
          overflow: 'auto',
          fontSize: '1em'
      }}>
          <IngredientCard ingredient={ingredient2}/>
      </div>
  </div>
);

};


export default IngredientCombinedCard;