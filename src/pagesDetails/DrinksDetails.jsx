import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import queryDrinkByID from '../services/index';

function DrinksDetails() {
  const { drinkId } = useParams();
  const { dataDrinks } = useContext(MyContext);
  const { drinks } = dataDrinks;

  return (
    <main>
      {drinks && drinks.map((item, index) => {
        const {
          idDrink,
          strDrink,
          strDrinkThumb,
          strCategory,
          // strArea,
          strInstructions,
          // strTags,
          // strIngredient1,
        } = item;
        if (idDrink === drinkId) {
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
                    type="button"
                    data-testid="favorite-btn"
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
                  <button
                    data-testid="start-recipe-btn"
                    type="button"
                    // onClick=""
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

export default DrinksDetails;
