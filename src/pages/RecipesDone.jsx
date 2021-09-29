import React from 'react';
import Header from '../components/Header';
import CardRecipe from '../components/CardRecipe';

// Preciso saber de onde virão os dados ref. as receitas feitas, sejam eles comidas ou bebidas;

const RecipesDone = () => (
  <div>
    <Header title="Receitas Feitas" />
    <div>
      <button data-testid="filter-by-all-btn" type="button">All</button>
      <button data-testid="filter-by-food-btn" type="button">Food</button>
      <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
    </div>
    { arrayQueContemAListaDeFavoritos.map((item, index) => (
      <CardRecipe
        Key={ index }
        arrTags={ item }
        dtRecipeDone={ item }
        indexProps={ item }
        sourceImage={ item }
        strCategory={ item }
        strRecipeName={ item }
      />
    ))}
  </div>
);

export default RecipesDone;
