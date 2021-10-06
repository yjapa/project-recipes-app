import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import '../css/pageProgress.css';
import { checkFavorite, renderFavorite } from '../components/FavoriteButton';

function DrinksProgress() {
  const { pathname } = useLocation();
  const { drinkId } = useParams();
  const { listIngredients,
    drinksApi: { fetchDataByIdDrink },
    drinksById } = useContext(MyContext);
  const { drinks } = drinksById;
  const ingredients = [];
  const history = useHistory();
  const [listIngredientsCocktails, setListIngredientCocktails] = useState([]);
  const [finishRecipeCocktails, setFinishRecipeCocktails] = useState(true);
  listIngredients(drinks, ingredients);

  const handleScratchedIngredient = ({ target }, i) => {
    const scratched = document.querySelectorAll('.teste')[i];
    const checkbox = document.querySelectorAll('input[type=checkbox]')[i];
    if (checkbox.checked) {
      scratched.classList.add('risk');
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        cocktails: {
          ...saveProgress.cocktails,
          [drinkId]: [...saveProgress.cocktails[drinkId], target.value],
        },
      });
      setListIngredientCocktails([...listIngredientsCocktails, target.value]);
    } else {
      const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      scratched.classList.remove('risk');
      const removeIngredient = saveProgress.cocktails[drinkId];
      removeIngredient.splice(removeIngredient.indexOf(target.value), 1);
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        cocktails: {
          ...saveProgress.cocktails,
          [drinkId]: removeIngredient,
        },
      });
      setListIngredientCocktails([...removeIngredient]);
    }
  };

  const favoriteStorage = () => drinks.map((item) => {
    const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = item;
    return ({
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
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
      localStorage.inProgressRecipes = JSON.stringify(LS);
    }
  };

  useEffect(() => {
    fetchDataByIdDrink(drinkId);
    setLocalStorage();
    checkFavorite(drinkId);
  }, []);

  const switchFinishBtnCocktails = () => {
    const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const checkboxLength = document.querySelectorAll('input[type=checkbox]').length;
    if (saveProgress.cocktails[drinkId].length === checkboxLength) {
      setFinishRecipeCocktails(false);
    } else {
      setFinishRecipeCocktails(true);
    }
  };

  useEffect(() => {
    switchFinishBtnCocktails();
  }, [listIngredientsCocktails]);

  const handleClick = () => {
    history.push('/receitas-feitas');
  };

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
              disabled={ finishRecipeCocktails }
              onClick={ handleClick }
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
