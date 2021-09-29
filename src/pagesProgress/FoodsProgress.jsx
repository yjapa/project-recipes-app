import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/pageProgress.css';

function FoodsProgress() {
  const { mealId } = useParams();
  const { listIngredients,
    recipesApi: { fetchDataByIdMeal }, mealsDataById } = useContext(MyContext);
  const { meals } = mealsDataById;
  const ingredients = [];
  listIngredients(meals, ingredients);

  useEffect(() => {
    fetchDataByIdMeal(mealId);
  }, []);

  const handleScratchedIngredient = (event, i) => {
    const scratched = document.querySelectorAll('.teste')[i];
    if (scratched.classList.contains('risk')) {
      scratched.classList.remove('risk');
    } else {
      scratched.classList.add('risk');
    }
  };

  return (
    <div>
      {meals && meals.map((item, index) => {
        const {
          strMeal,
          strMealThumb,
          strCategory,
          strInstructions,
        } = item;
        return (
          <div key={ index }>
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid="recipe-photo"
              style={ { width: '300px' } }
            />
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
              {ingredients.map((ingredient, i) => (
                <div key={ i }>
                  <label
                    htmlFor={ i }
                    className="teste"
                  >
                    <input
                      type="checkbox"
                      id={ i }
                      value={ ingredient }
                      data-testid="ingredient-step"
                      onChange={ (event) => handleScratchedIngredient(event, i) }
                    />
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
      })}
    </div>
  );
}

export default FoodsProgress;
