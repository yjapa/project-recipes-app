import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import MyContext from '../context/myContext';
import { checkFavorite } from '../components/CheckFavorite';
import FavoriteFood from '../components/FavoriteFoods';
import '../css/carousel.css';

function FoodsDetails() {
  const { pathname } = useLocation();
  const [mealsDataById, setMealsDataById] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const { listIngredients,
    recipesApi: { fetchDataByIdMeal } } = useContext(MyContext);
  const { mealId } = useParams();
  const history = useHistory();
  const { meals } = mealsDataById;
  const ingredients = [];
  listIngredients(meals, ingredients);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const idFood = await fetchDataByIdMeal(mealId);
      setMealsDataById(idFood);
      const request = await fetch(url);
      const json = await request.json();
      setCarouselData(json.drinks);
    };
    fetchData();
  }, [fetchDataByIdMeal, mealId]);

  useEffect(() => {
    const checkRecipe = () => {
      const mealStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (mealStorage !== null && mealStorage.meals !== undefined) {
        const storageMealIds = Object.keys(mealStorage.meals);
        if (storageMealIds.includes(mealId)) {
          localStorage.setItem('startButton', false);
        } else {
          localStorage.setItem('startButton', true);
        }
      } else {
        localStorage.setItem('startButton', true);
      }
    };
    checkRecipe();
  }, [mealId]);

  useEffect(() => {
    checkFavorite(mealId);
  }, [mealId]);

  const handleClick = (idMeal) => {
    const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('startButton', false);
    if (saveProgress === null) {
      localStorage.inProgressRecipes = JSON.stringify({ meals: {
        [mealId]: [],
      } });
      (history.push(`/comidas/${idMeal}/in-progress`));
    } else {
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        meals: {
          ...saveProgress.meals,
          [mealId]: [],
        },
      });
      (history.push(`/comidas/${idMeal}/in-progress`));
    }
  };

  const renderButton = () => {
    const startBtnStorage = JSON.parse(localStorage.getItem('startButton'));
    return (
      <button
        id="btn-start"
        className="btn-style"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => handleClick(mealId) }
      >
        {startBtnStorage ? 'Iniciar Receita' : 'Continuar Receita' }
      </button>);
  };

  // referência: https://blog.dadops.co/2021/03/17/copy-and-paste-in-a-react-app/
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
                <FavoriteFood
                  meals={ meals }
                  typeCategory="comida"
                />
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
                <iframe
                  title="Video"
                  data-testid="video"
                  src={ strYoutube.replace('watch?v=', 'embed/') }
                />
                { renderButton() }
              </section>
              <div className="recomendation-container">
                {carouselData.slice(0, Number('6')).map((itemCarousel, i) => (
                  <div
                    key={ `${i}-${itemCarousel}` }
                    data-testid={ `${i}-recomendation-card` }
                  >
                    <h4
                      data-testid={ `${i}-recomendation-title` }
                    >
                      { itemCarousel.strDrink }
                    </h4>
                    <img
                      src={ itemCarousel.strDrinkThumb }
                      alt="Comida Recomendada"
                      width="150px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
export default FoodsDetails;
