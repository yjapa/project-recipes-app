import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodsProgress() {
  const { meals, listIngredients } = useContext(MyContext);
  const { mealId } = useParams();
  const ingredients = [];
  listIngredients(meals, ingredients);

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
                  <div key={ indexad }>
                    <label key={ indexad } htmlFor={ indexad }>
                      <input type="checkbox" name="ingredient" id={ indexad } />
                      {`${ingredient}`}
                    </label>
                  </div>
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
