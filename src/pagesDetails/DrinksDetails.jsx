import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { queryDrinkByID } from '../services';
import MyContext from '../context/myContext';

const listDetails = (DataDetails, ingredients) => {
  const number = 20;
  if (DataDetails && DataDetails.length !== 0) {
    for (let i = 1; i <= number; i += 1) {
      if (DataDetails[0][`strIngredient${i}`]) {
        const ing = `${DataDetails[0][`strIngredient${i}`]}`;
        const mes = `${DataDetails[0][`strMeasure${i}`]}`;
        ingredients.push(`${ing} ${(mes === 'null') ? '' : mes}`);
      } else break;
    }
  }
};

function DrinksDetails() {
  const { drinkId } = useParams();
  const [drinksById, setDrinksById] = useState([]);
  const { drinks } = drinksById;
  const { displayIngredientsAndMeasures } = useContext(MyContext);
  const ingredients = [];
  listDetails(drinks, ingredients);

  const fetchDataByID = async () => {
    const dados = await queryDrinkByID(drinkId);
    setDrinksById(dados);
  };

  useEffect(() => {
    fetchDataByID();
  }, []);

  return (
    <main>

      {drinks && drinks.map((item, index) => {
        const {
          strDrink,
          strDrinkThumb,
          strCategory,
          // strArea,
          strInstructions,
          // strTags,
          // strIngredient1,
        } = item;
        // if (idDrink === drinkId) {
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
                  // onClick=""
                >
                  IniciarReceita
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
