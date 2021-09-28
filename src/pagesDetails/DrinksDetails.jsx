import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import MyContext from '../context/myContext';

function DrinksDetails() {
  const { drinkId } = useParams();
  const { listIngredients, drinksById,
    drinksApi: { fetchDataByIdDrink } } = useContext(MyContext);
  const { drinks } = drinksById;
  const history = useHistory();
  const ingredients = [];
  listIngredients(drinks, ingredients);

  useEffect(() => {
    fetchDataByIdDrink(drinkId);
  }, []);

  const handleClick = (idDrink) => history.push(`/bebidas/${idDrink}/in-progress`);

  return (
    <main>
      {drinks && drinks.map((item, index) => {
        const {
          strDrink,
          strDrinkThumb,
          strCategory,
          strInstructions,
        } = item;
        return (
          <section key={ index }>
            <div>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid="recipe-photo"
              />
              <section>
                <h1
                  data-testid="recipe-title"
                >
                  {strDrink}
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
                    src={ blackHeartIcon }
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
                  <h2>instructions</h2>
                  <p
                    data-testid="instructions"
                  >
                    {strInstructions}
                  </p>
                </div>
                <button
                  data-testid="start-recipe-btn"
                  type="button"
                  onClick={ () => handleClick(drinkId) }
                >
                  Iniciar Receita
                </button>
              </section>
            </div>
          </section>
        );
      })}
      ;
    </main>
  );
}
export default DrinksDetails;
