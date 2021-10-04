import React, { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import MyContext from '../context/myContext';

function FoodsDetails() {
  const { pathname } = useLocation();
  const { listIngredients,
    recipesApi: { fetchDataByIdMeal },
    mealsDataById } = useContext(MyContext);
  const { mealId } = useParams();
  const history = useHistory();
  const { meals } = mealsDataById;
  const ingredients = [];
  listIngredients(meals, ingredients);


  const setStorage = () => {
    localStorage.setItem('startButton', true);
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ meals: { [mealId]: [] } }));
  };

  const handleClick = (idMeal) => {
    const recipeArr = JSON.parse(localStorage.getItem('startedRecipes'));
    recipeArr.push(mealId);
    localStorage.setItem('startedRecipes', JSON.stringify(recipeArr));
    localStorage.setItem('startButton', false);

    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ meals: { [mealId]: [] } }));
      // console.log(meals)
  // const setStorage = () => localStorage.setItem('startButton', true);

  const handleClick = (idMeal) => {
    const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('startButton', false);
      if (saveProgress === null) {
      localStorage.inProgressRecipes = JSON.stringify({ meals: {
        [mealId]: [],
      } });
    } else {
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        meals: {
          ...saveProgress.meals,
          [mealId]: [],
        },
      });
    }
    (history.push(`/comidas/${idMeal}/in-progress`));
  };

  const checkRecipe = () => {
    const recipeArr = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mealKey = recipeArr.meals[mealId];
    // console.log(meals)
    mealKey.filter((item) => {
      if (item === mealId) {
    const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mealStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (mealStorage !== null && mealStorage.meals !== undefined) {
      const storageMealIds = Object.keys(mealStorage.meals);
      if (storageMealIds.includes(mealId)) {
        localStorage.setItem('startButton', false);
        console.log(saveProgress);
      } else {
        localStorage.setItem('startButton', true);
        console.log(saveProgress);

        // console.log(storageMealIds);
        // console.log(mealId);
      }
    } else {
      localStorage.setItem('startButton', true);
      console.log('asasa');
    }
  };

  const continueClick = (idMeal) => {
    (history.push(`/comidas/${idMeal}/in-progress`));
  };

  useEffect(() => {
    fetchDataByIdMeal(mealId);
    // setStorage();
    checkRecipe();
  }, []);

  const renderButton = () => {
    const startBtnStorage = JSON.parse(localStorage.getItem('startButton'));

    if (startBtnStorage) {
      return (
        <button
          id="btn-start"
          className="btn-style"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => handleClick(mealId) }
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
        onClick={ () => continueClick(mealId) }
      >
        Continuar Receita
      </button>
    );
  };

  // referencia: https://blog.dadops.co/2021/03/17/copy-and-paste-in-a-react-app/
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

  return (
    <main>
      {meals && meals.map((item, index) => {
        const {
          strMeal,
          strMealThumb,
          strCategory,
          strInstructions,
          strYoutube,
        } = item;
        return (
          <section key={ index }>
            <div>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                style={ { width: '200px' } }
                data-testid="recipe-photo"
              />
              <section
                id="sec-top"
              >
                <h1
                  data-testid="recipe-title"
                >
                  {strMeal}
                </h1>
                <h3
                  data-testid="recipe-category"
                >
                  {strCategory}
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
                <video
                  src={ strYoutube }
                  data-testid="video"
                >
                  <track
                    default
                    kind="captions"
                    src=""
                  />
                  Video
                </video>
                { renderButton() }
              </section>
              <span
                data-testid="0-recomendation-card"
              >
                Aqui vem o Carrossel
              </span>
            </div>
          </section>
        );
      })}
    </main>
  );
}

export defaul FoodsDetails;
