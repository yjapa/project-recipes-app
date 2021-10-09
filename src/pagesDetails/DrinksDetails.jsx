import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import MyContext from '../context/myContext';
import { checkFavorite } from '../components/CheckFavorite';
import FavoriteDrink from '../components/FavoriteDrink';
import '../css/Caouresel.css';

function DrinksDetails() {
  const { pathname } = useLocation();
  const { drinkId } = useParams();
  const [drinksById, setDrinksById] = useState([]);
  // const [carouselData, setCarouselData] = useState([]);
  const { listIngredients,
    drinksApi: { fetchDataByIdDrink },
  } = useContext(MyContext);
  const { drinks } = drinksById;
  const history = useHistory();
  const ingredients = [];
  listIngredients(drinks, ingredients);

  useEffect(() => {
    const fetchData = async () => {
      // const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const idDrink = await fetchDataByIdDrink(drinkId);
      setDrinksById(idDrink);
      // const request = await fetch(url);
      // const json = await request.json();
      // setCarouselData(json.meals);
    };
    fetchData();
  }, [fetchDataByIdDrink, drinkId]);

  useEffect(() => {
    const checkRecipe = () => {
      const drinkStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (drinkStorage !== null && drinkStorage.cocktails !== undefined) {
        const storageDrinkIds = Object.keys(drinkStorage.cocktails);
        if (storageDrinkIds.includes(drinkId)) {
          localStorage.setItem('startButton', false);
        } else {
          localStorage.setItem('startButton', true);
        }
      } else {
        localStorage.setItem('startButton', true);
      }
    };
    checkRecipe();
  }, [drinkId]);

  useEffect(() => {
    checkFavorite(drinkId);
  }, [drinkId]);

  const handleClick = (idDrink) => {
    const saveProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('startButton', false);
    if (saveProgress === null) {
      localStorage.inProgressRecipes = JSON.stringify({ cocktails: {
        [drinkId]: [],
      } });
      (history.push(`/bebidas/${idDrink}/in-progress`));
    } else {
      localStorage.inProgressRecipes = JSON.stringify({
        ...saveProgress,
        cocktails: {
          ...saveProgress.cocktails,
          [drinkId]: [],
        },
      });
      history.push(`/bebidas/${idDrink}/in-progress`);
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
        onClick={ () => handleClick(drinkId) }
      >
        {startBtnStorage ? 'Iniciar Receita' : 'Continuar Receita' }
      </button>);
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
      {drinks && drinks.map((item, index) => {
        const {
          strDrink,
          strDrinkThumb,
          strAlcoholic,
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
                <FavoriteDrink
                  drinks={ drinks }
                  typeCategory="bebida"
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
                { renderButton() }
              </section>
            </div>
            <div className="recomendation-container">
              vem aqui o carrosel
              {/* {carouselData.slice(0, Number('6')).map((itemCarousel, i) => (
                <div
                  key={ `${i}-${itemCarousel}` }
                  data-testid={ `${i}-recomendation-card` }
                >
                  <h4
                    data-testid={ `${i}-recomendation-title` }
                  >
                    { itemCarousel.strMeal }
                  </h4>
                  <img
                    src={ itemCarousel.strMealThumb }
                    alt="Comida Recomendada"
                    width="150px"
                  />
                </div>
              ))} */}
            </div>
          </section>
        );
      })}
      ;
    </main>
  );
}
export default DrinksDetails;
