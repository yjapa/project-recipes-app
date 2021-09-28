import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import MyContext from '../context/myContext';

function FoodsDetails() {
  const { listIngredients,
    recipesApi: { fetchDataByIdMeal }, mealsDataById } = useContext(MyContext);
  const { mealId } = useParams();
  const history = useHistory();
  const { meals } = mealsDataById;
  const ingredients = [];
  listIngredients(meals, ingredients);

  useEffect(() => {
    fetchDataByIdMeal(mealId);
  }, []);

  const handleClick = (idMeal) => {
    const buttonStart = document.querySelector('#btn-start');
    const buttonContinue = document.querySelector('#btn-continue');
    buttonStart.classList.remove('btn-style');
    buttonStart.classList.add('btn-disabled');
    buttonContinue.classList.remove('btn-disabled');
    buttonContinue.classList.add('btn-style');
    if (buttonContinue.classList.contains('btn-style')) {
      return (history.push(`/comidas/${idMeal}/in-progress`));
    }
  };

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
                      <li>{ingredient}</li>
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
                <video src={ strYoutube }>
                  <track
                    default
                    kind="captions"
                    src=""
                  />
                  Video
                </video>
                <button
                  id="btn-start"
                  className="btn-style"
                  data-testid="start-recipe-btn"
                  type="button"
                  onClick={ () => handleClick(mealId) }
                >
                  Iniciar Receita
                </button>
                <button
                  id="btn-continue"
                  className="btn-disabled"
                  data-testid="start-recipe-btn"
                  type="button"
                  onClick={ () => handleClick(mealId) }
                >
                  Continuar Receita
                </button>
              </section>
            </div>
          </section>
        );
      })}
    </main>
  );
}
export default FoodsDetails;
