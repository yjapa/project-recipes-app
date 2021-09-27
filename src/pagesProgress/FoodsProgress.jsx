import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodsProgress() {
  const { meals } = useContext(MyContext);
  const { mealId } = useParams();

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
        const renderIngredients = () => {
          const mealsFilter = meals.find((itemMeal) => itemMeal.idMeal === mealId);
          console.log(mealsFilter);
          const ingredients = Object.values(mealsFilter).slice(9, 29);
          return ingredients.map((itemIng, indexIng) => {
            if (itemIng) {
              return (
                <label htmlFor={ indexIng } key={ indexIng }>
                  <input
                    type="checkbox"
                    data-testid={ `${indexIng}-ingredient-step` }
                  />
                  {` - ${itemIng}`}
                </label>
              );
            }
            return ('');
          });
        };

        const renderMeasure = () => {
          const measureFilter = meals.find((itemMeal) => itemMeal.idMeal === mealId);
          const measure = Object.values(measureFilter).slice(29, 48);
          return measure.map((itemMea, indexMea) => {
            if (itemMea.trim()) {
              return (
                <label htmlFor={ indexMea } key={ indexMea }>
                  <input
                    type="checkbox"
                    data-testid={ `${indexMea}-ingredient-step` }
                  />
                  {` - ${itemMea}`}
                </label>
              );
            }
            return ('');
          });
        };
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
                {renderIngredients()}
                {renderMeasure()}
              </section>
              <section>
                <h1 data-testid="instructions">Instruções</h1>
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
