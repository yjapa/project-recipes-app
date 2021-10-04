import React, { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import MyContext from '../context/myContext';

function DrinksDetails() {
  const { pathname } = useLocation();
  const { drinkId } = useParams();
  const { listIngredients, drinksById,
    drinksApi: { fetchDataByIdDrink },
  } = useContext(MyContext);
  const { drinks } = drinksById;
  const history = useHistory();
  const ingredients = [];
  listIngredients(drinks, ingredients);

  const setStorage = () => {
    const recipeArr = JSON.parse(localStorage.getItem('startedRecipes'));
    if (!recipeArr) {
      localStorage.setItem('startButton', true);
      localStorage.setItem('startedRecipes', JSON.stringify([]));
    }
  };

  const checkRecipe = () => {
    const recipeArr = JSON.parse(localStorage.getItem('startedRecipes'));
    if (recipeArr.includes(drinkId)) {
      localStorage.setItem('startButton', false);
    } else {
      localStorage.setItem('startButton', true);
    }
    console.log(recipeArr);
  };

  useEffect(() => {
    fetchDataByIdDrink(drinkId);
    setStorage();
    checkRecipe();
  }, []);

  const handleClick = (idDrink) => {
    const recipeArr = JSON.parse(localStorage.getItem('startedRecipes'));
    recipeArr.push(drinkId);
    localStorage.setItem('startedRecipes', JSON.stringify(recipeArr));
    localStorage.setItem('startButton', false);
    (history.push(`/bebidas/${idDrink}/in-progress`));
  };

  const continueClick = (idMeal) => {
    (history.push(`/comidas/${idMeal}/in-progress`));
  };

  const renderButton = () => {
    const startBtnStorage = JSON.parse(localStorage.getItem('startButton'));

    if (startBtnStorage) {
      return (
        <button
          id="btn-start"
          className="btn-style"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => handleClick(drinkId) }
        >
          Iniciar Receita
        </button>);
    }
    return (
      <button
        id="btn-continue"
        className="btn-style"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => continueClick(drinkId) }
      >
        Continuar Receita
      </button>
    );
  };

  // referencia: https://blog.dadops.co/2021/03/17/copy-and-paste-in-a-react-app/
  function copyUrl() {
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
  }

  return (
    <main>
      {drinks && drinks.map((item, index) => {
        const {
          strDrink,
          strDrinkThumb,
          strAlcoholic,
          // strArea,
          strInstructions,
        } = item;
        return (
          <section key={ index }>
            <div>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                style={ { width: '200px' } }
                data-testid="recipe-photo"
              />
              <section
                id="sec-top"
              >
                <h1
                  data-testid="recipe-title"
                >
                  {strDrink}
                </h1>
                <h3
                  data-testid="recipe-category"
                >
                  {strAlcoholic}
                </h3>
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ copyUrl }
                >
                  <img
                    src={ shareIcon }
                    alt="Compartilhar"
                  />
                </button>
                <button
                  data-testid="favorite-btn"
                  type="button"
                >
                  <img
                    src={ whiteHeartIcon }
                    alt="Favoritar"
                  />
                </button>
              </section>
              <section>
                <div>
                  <h2>Ingredients</h2>
                  {ingredients.map((ingredient, indexIng) => (
                    <ul key={ indexIng }>
                      <li
                        data-testid={ `${indexIng}-ingredient-name-and-measure` }
                      >
                        {ingredient}

                      </li>
                    </ul>
                  ))}
                </div>
                <div>
                  <h2>Instructions</h2>
                  <p
                    data-testid="instructions"
                  >
                    {strInstructions}
                  </p>
                </div>
                { renderButton() }
              </section>
            </div>
            <span
              data-testid="0-recomendation-card"
            >
              Teste
            </span>
          </section>
        );
      })}
      ;
    </main>
  );
}
export default DrinksDetails;
