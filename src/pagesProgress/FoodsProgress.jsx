import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import '../css/pageProgress.css';
import { checkFavorite, renderFavorite } from '../components/FavoriteButton';

function FoodsProgress() {
  const { pathname } = useLocation();
  const { mealId } = useParams();
  const { listIngredients,
    recipesApi: { fetchDataByIdMeal },
    mealsDataById, feedDoneRecipesInLocalStorageFoods } = useContext(MyContext);
  const { meals } = mealsDataById;
  const ingredients = [];
  const history = useHistory();
  const [listIngredientFoods, setListIngredientFoods] = useState([]);
  const [finishRecipeFoods, setFinishRecipeFoods] = useState(true);
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
      setListIngredientFoods([...listIngredientFoods, target.value]);
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
      setListIngredientFoods([...removeIngredient]);
    }
  };

  const favoriteStorage = () => meals.map((item) => {
    const {
      idMeal,
      strArea,
      strCategory,
      strMeal,
      strMealThumb,
    } = item;
    return ({
      id: idMeal,
      type: 'comida',
      image: strMealThumb,
      name: strMeal,
      category: strCategory,
      area: strArea,
      alcoholicOrNot: '',
    });
  });

  const favoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = JSON.parse(localStorage.getItem('isFavorite'));
    if (!isFavorite) {
      localStorage.setItem('isFavorite', true);
      if (favoriteRecipes === null) {
        localStorage.favoriteRecipes = JSON.stringify(favoriteStorage());
      } else {
        const recipesArr = [...favoriteRecipes, ...favoriteStorage()];
        localStorage.setItem('favoriteRecipes', JSON.stringify(recipesArr));
      }
    } else {
      localStorage.setItem('isFavorite', false);
      const index = favoriteRecipes.indexOf(favoriteStorage());
      favoriteRecipes.splice(index, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
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
  useEffect(() => {
    fetchDataByIdMeal(mealId);
    setLocalStorage();
  }, []);
  const switchFinishBtnFoods = () => {
    const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const checkboxLength = document.querySelectorAll('input[type=checkbox]').length;
    if (saveProgress.meals[mealId].length === checkboxLength) {
      setFinishRecipeFoods(false);
    } else {
      setFinishRecipeFoods(true);
    }
  };
  useEffect(() => {
    switchFinishBtnFoods();
  }, [listIngredientFoods]);

  useEffect(() => {
    checkFavorite(mealId);
  });

  const handleClick = () => {
    feedDoneRecipesInLocalStorageFoods(meals);
    history.push('/receitas-feitas');
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
            <section
              id="sec-top"
            >
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
                onClick={ copyUrl }
              >
                <img
                  src={ shareIcon }
                  alt={ shareIcon }
                  data-testid="share-btn"

                />
              </button>
              {renderFavorite(favoriteClick)}
            </section>
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
              disabled={ finishRecipeFoods }
              onClick={ () => handleClick() }
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
