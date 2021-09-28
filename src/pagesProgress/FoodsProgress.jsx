import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// https://github.com/tryber/sd-013-a-project-recipes-app/pull/9/files referência grupo 24!
const listDetails = (DataDetails, ingredients) => {
  const number = 20;
  if (DataDetails && DataDetails.length !== 0) {
    for (let i = 1; i <= number; i += 1) {
      if (DataDetails[0][`strIngredient${i}`]) {
        const ing = `${DataDetails[0][`strIngredient${i}`]}`;
        const mes = `${DataDetails[0][`strMeasure${i}`]}`;
        ingredients.push(`${ing} ${(mes === 'null') ? '' : mes}`);
      } else break;
    }
  }
};

function FoodsProgress() {
  const { meals } = useContext(MyContext);
  const { mealId } = useParams();
  const ingredients = [];
  listDetails(meals, ingredients);
  return (
    <div>
      {meals && meals.map((item, index) => {
        const {
          strMeal,
          strMealThumb,
          idMeal,
          strCategory,
          strInstructions,
        } = item;
        if (idMeal === mealId) {
          return (
            <div key={ index }>
              <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
              <h2 data-testid="recipe-title">{strMeal}</h2>
              <span data-testid="recipe-category">{strCategory}</span>
              <button
                type="button"
                data-testid="share-btn"
              >
                <img src={ shareIcon } alt={ shareIcon } />
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
              >
                <img src={ whiteHeartIcon } alt={ whiteHeartIcon } />
              </button>
              <section>
                <h3>Ingredients</h3>
                {ingredients.map((ingredient, indexad) => (
                  <label key={ indexad } htmlFor={ indexad }>
                    <input type="checkbox" name="ingredient" id={ indexad } />
                    {` - ${ingredient}`}
                  </label>
                ))}
              </section>
              <section>
                <h3 data-testid="instructions">Instructions</h3>
                <p data-testid="instructions">{strInstructions}</p>
              </section>

              <button
                type="button"
                data-testid="finish-recipe-btn"
              >
                Finalizar Receita
              </button>
            </div>
          );
        }
        return ('');
      })}
    </div>
  );
}

export default FoodsProgress;
