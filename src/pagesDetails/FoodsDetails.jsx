import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import queryRecipeByID from '../services/index';

function FoodsDetails() {
  const { mealId } = useParams();
  const { meals } = useContext(MyContext);
  const history = useHistory();

  // useEffect(() => {
  //   // const recipeDetails = queryRecipeByID(mealId);
  //   console.log(recipeDetails);
  //   return recipeDetails;
  // }, []);

  const handleClick = (idMeal) => history.push(`/comidas/${idMeal}/in-progress`);

  return (
    <main>
      {meals && meals.map((item, index) => {
        const {
          idMeal,
          strMeal,
          strMealThumb,
          strCategory,
          // strArea,
          strInstructions,
          // strTags,
          strYoutube,
          // strIngredient1,
        } = item;
        if (idMeal === mealId) {
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
                  <p
                    data-testid="instructions"
                  >
                    {strInstructions}
                  </p>
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
                    onClick={ () => handleClick(idMeal) }
                  >
                    Iniciar Receita
                  </button>
                </section>
              </div>
            </section>
          );
        }
        return ('');
      })}
    </main>
  );
}

export default FoodsDetails;
