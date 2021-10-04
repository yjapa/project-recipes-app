import React, { useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/pageProgress.css';

function DrinksProgress() {
  const { pathname } = useLocation();
  const { drinkId } = useParams();
  const [checkboxSave, setCheckboxSave] = useState([]);
  const { listIngredients,
    drinksApi: { fetchDataByIdDrink }, drinksById } = useContext(MyContext);
  const { drinks } = drinksById;
  const ingredients = [];
  listIngredients(drinks, ingredients);
  const handleScratchedIngredient = (event, i) => {
    const eve = event.target.value;
    const scratched = document.querySelectorAll('.teste')[i];
    const checkbox = document.querySelectorAll('input[type=checkbox]')[i];
    if (checkbox.checked) {
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        cocktails: {
          ...saveProgress.cocktails,
          [drinkId]: [...saveProgress.cocktails[drinkId], eve],
        },
      });
      scratched.classList.add('risk');
    } else {
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      scratched.classList.remove('risk');
      const removeIngredient = saveProgress.cocktails[drinkId];
      removeIngredient.splice(removeIngredient.indexOf(event.target.value), 1);
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        cocktails: {
          ...saveProgress.cocktails,
          [drinkId]: removeIngredient,
        },
      });
    }
  };

  const saveIngredientChecked = (event, i) => {
    const checkbox = document.querySelectorAll('input[type=checkbox]')[i];
    const eve = event.target.value;
    const test = { cocktails: {
      [drinkId]: [...checkboxSave, eve],
    } };
    const saveProgress = localStorage.getItem('inProgressRecipes');
    const saveProgressParse = JSON.parse(saveProgress);
    if (saveProgressParse === null) {
      localStorage.inProgressRecipes = JSON.stringify(test);
    }
    const { cocktails } = saveProgressParse;
    const saveDrinksLS = {
      cocktails: { ...cocktails, [drinkId]: [...checkboxSave, eve] },
    };

    const removeDrinksLS = {
      cocktails: { [drinkId]: checkboxSave },
  function copyUrl() {
    const THREESEC = 3000;
    const section = document.getElementById('sec-top');
    const inviUrl = document.createElement('input');
    const advise = document.createElement('span');
    advise.innerText = 'Link copiado!';
    inviUrl.value = `http://localhost:3000${pathname}`;
    document.body.appendChild(inviUrl);
    inviUrl.select();
    document.execCommand('copy');
    document.body.removeChild(inviUrl);
    section.appendChild(advise);
    setTimeout(() => {
      section.removeChild(advise);
    }, THREESEC);
  }
  const ingredientsInProgress = () => {
    const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getCocktails = saveProgress.cocktails;
    const arrayIngredients = getCocktails[drinkId];
    if (arrayIngredients) {
      arrayIngredients.map((idIngredient) => {
        const checkboxChecked = document.getElementById(idIngredient);
        if (checkboxChecked) {
          console.log(checkboxChecked);
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
      cocktails: {
        [drinkId]: [],
      },

    };
    const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (saveProgress === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(LS));
    }
  };
  useEffect(() => {
    fetchDataByIdDrink(drinkId);
    setLocalStorage();
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
            <section
              id="sec-top"
            >
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
                onClick={ copyUrl }
              >
                <img src={ shareIcon } alt={ shareIcon } />
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
              >
                <img src={ whiteHeartIcon } alt={ whiteHeartIcon } />
              </button>
            </section>
            <section>
              <h3>Ingredients</h3>
              {ingredients.map((ingredient, indexad) => (
                <div key={ indexad }>
                  <label
                    htmlFor={ ingredient }
                    className="teste"
                    data-testid={ `${indexad}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id={ ingredient }
                      value={ ingredient }
                      onClick={ (event) => handleScratchedIngredient(event, indexad) }
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
