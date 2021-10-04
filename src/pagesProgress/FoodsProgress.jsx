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

  const handleScratchedIngredient = ({ target }, i) => {
    const scratched = document.querySelectorAll('.teste')[i];
    const checkbox = document.querySelectorAll('input[type=checkbox]')[i];
    if (checkbox.checked) {
      scratched.classList.add('risk');
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        meals: {
          ...saveProgress.meals,
          [mealId]: [...saveProgress.meals[mealId], target.value],
        },
      });
    } else {
      scratched.classList.remove('risk');
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const removeIngredient = saveProgress.meals[mealId];
      removeIngredient.splice(removeIngredient.indexOf(target.value), 1);
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        meals: {
          ...saveProgress.meals,
          [mealId]: removeIngredient,
        },
      });
    }
  };

  const ingredientsInProgress = () => {
    const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getCocktails = saveProgress.meals;
    const arrayIngredients = getCocktails[mealId];
    if (arrayIngredients) {
      arrayIngredients.map((idIngredient) => {
        const checkboxChecked = document.getElementById(idIngredient);
        if (checkboxChecked) {
          checkboxChecked.parentElement.classList.add('risk');
          checkboxChecked.checked = true;
          checkboxChecked.setAttribute('checked', 'true');
        } return null;
      });
    }
  };

  setTimeout(() => {
    ingredientsInProgress();
  });

  const setLocalStorage = () => {
    const LS = {
      meals: {
        [mealId]: [],
      },
    };
    const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (saveProgress === null) {
      localStorage.inProgressRecipes = JSON.stringify(LS);
    }
  };

  useEffect(() => {
    fetchDataByIdMeal(mealId);
    setLocalStorage();
    ingredientsInProgress();
  }, []);

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
                    htmlFor={ ingredient }
                    className="teste"
                    data-testid={ `${i}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id={ ingredient }
                      value={ ingredient }
                      onClick={ (event) => handleScratchedIngredient(event, i) }
                    />
                    {ingredient}
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
