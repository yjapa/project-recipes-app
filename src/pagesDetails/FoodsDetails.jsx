import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { queryRecipeByID } from '../services';
import MyContext from '../context/myContext';

function FoodsDetails() {
  const { listIngredients } = useContext(MyContext);
  const { mealId } = useParams();
  const history = useHistory();
  const [mealsDataById, setMealsDataById] = useState([]);
  const { meals } = mealsDataById;
  const { displayIngredientsAndMeasures } = useContext(MyContext);
  const ingredients = [];
  listIngredients(meals, ingredients);

  const fetchDataByID = async () => {
    const dados = await queryRecipeByID(mealId);
    setMealsDataById(dados);
  };

  useEffect(() => {
    fetchDataByID();
  }, []);

  const handleClick = (idMeal) => history.push(`/comidas/${idMeal}/in-progress`);

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
                  data-testid="start-recipe-btn"
                  type="button"
                  onClick={ () => handleClick(mealId) }
                >
                  Iniciar Receita
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
