import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { queryRecipeByID } from '../services';

function FoodsDetails() {
  const { mealId } = useParams();
  const [mealsDataById, setMealsDataById] = useState([]);
  // const [mealsDataByIdClone, setMealsDataByIdClone] = useState([]);
  const { meals } = mealsDataById;

  // const [ingredients, setIngredients] = useState([]);
  // const [measures, setMeasures] = useState([]);

  // const displayIngredients = () => {
  //   console.log('ingredients', ingredients);
  //   ingredients.map((ingredient, index) => (
  //     <ul key={ index }>
  //       <li data-testid={ `${index}-ingredient-name-and-measure` }>
  //         {`${ingredient} - ${measures[index]}`}
  //       </li>
  //     </ul>
  //   ));
  // };

  const fillIngredients = (arr, maxNumber) => {
    for (let index = 1; index <= maxNumber; index += 1) {
      console.log('index', index);
      const strIngredient = `strIngredient${index}`;
      const strMeasure = `strMeasure${index}`;
      const varIngredient = arr[0][strIngredient];
      const varMeasure = arr[0][strMeasure];
      console.log('varIngredient', varIngredient);
      console.log('varMeasure', varMeasure);
      // if (varIngredient) {
      //   setIngredients([...ingredients, varIngredient]);
      //   setMeasures([...measures, varMeasure]);
      // }
      return (
        <ul key={ index }>
          <li data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${varIngredient} - ${varMeasure}`}
          </li>
        </ul>
      );
    }
    console.log('ingredients', ingredients);
    console.log('measures', measures);
    // displayIngredients();
  };

  const numMaxIterations = 20;

  const fetchDataByID = async () => {
    const dados = await queryRecipeByID(mealId);
    setMealsDataById(dados);
    // fillIngredients(numMaxIterations);
  };

  useEffect(() => {
    fetchDataByID();
    // setMealsDataByIdClone(mealsDataById);
    // fillIngredients(numMaxIterations);
  }, []);

  useEffect(() => {
    if (mealsDataById) {
      console.log('useEffect', mealsDataById);
      console.log('meals', meals);
      fillIngredients(numMaxIterations);
    }
  }, []);

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
        // return (
          // if (idMeal === mealId) {
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
                { meals ? fillIngredients(meals, numMaxIterations) : null}
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
                  // onClick=""
                >
                  IniciarReceita
                </button>
              </section>
            </div>
          </section>
        );
      })}
      {/* )}; */}
    </main>
  );
}
export default FoodsDetails;
