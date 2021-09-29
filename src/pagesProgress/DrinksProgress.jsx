import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/pageProgress.css';

function DrinksProgress() {
  const { drinkId } = useParams();
  const { listIngredients,
    drinksApi: { fetchDataByIdDrink }, drinksById } = useContext(MyContext);
  const { drinks } = drinksById;
  const ingredients = [];
  listIngredients(drinks, ingredients);

  const handleScratchedIngredient = (event, i) => {
    const scratched = document.querySelectorAll('.teste')[i];
    if (scratched.classList.contains('risk')) {
      scratched.classList.remove('risk');
    } else {
      scratched.classList.add('risk');
    }
  };

  useEffect(() => {
    fetchDataByIdDrink(drinkId);
  }, []);
  return (
    <div>
      {drinks && drinks.map((item, index) => {
        const {
          strDrink,
          strDrinkThumb,
          strCategory,
          strInstructions,
        } = item;
        return (
          <div key={ index }>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              style={ { width: '300px' } }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{strDrink}</h2>
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
                  <label
                    htmlFor={ indexad }
                    className="teste"
                    data-testid={ `${indexad}ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id={ indexad }
                      onChange={ (event) => handleScratchedIngredient(event, indexad) }
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

export default DrinksProgress;
