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
    mealsDataById, startButton, setStartButton } = useContext(MyContext);
  const { mealId } = useParams();
  const history = useHistory();
  const { meals } = mealsDataById;
  const ingredients = [];
  listIngredients(meals, ingredients);

  useEffect(() => {
    fetchDataByIdMeal(mealId);
  }, []);

  const handleClick = (idMeal) => {
    setStartButton(false);
    (history.push(`/comidas/${idMeal}/in-progress`));
  };

  const renderButton = () => {
    if (startButton) {
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
        onClick={ () => handleClick(mealId) }
      >
        Continuar Receita
      </button>
    );
  };

  // referencia: https://blog.dadops.co/2021/03/17/copy-and-paste-in-a-react-app/
  function copyUrl() {
    const inviUrl = document.createElement('input');
    inviUrl.value = `localhost:3000${pathname}`;
    document.body.appendChild(inviUrl);
    inviUrl.select();
    document.execCommand('copy');
    document.body.removeChild(inviUrl);
    global.alert('Link copiado!');
  }

  return (
    <main>
      {meals && meals.map((item, index) => {
        const {
          strMeal,
          strMealThumb,
          strCategory,
          // strArea,
          strInstructions,
          // strTags,
          strYoutube,
          // strIngredient1,
        } = item;
        return (
          <section key={ index }>
            <div>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid="recipe-photo"
              />
              <section>
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
                Teste
              </span>
            </div>
          </section>
        );
      })}
    </main>
  );
}
export default FoodsDetails;
