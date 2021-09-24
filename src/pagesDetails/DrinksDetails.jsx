import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinksDetails() {
  const { drinkId } = useParams();
  const { dataDrinks, loading } = useContext(MyContext);
  const isLoading = () => <p>loading...</p>;
  console.log(drinkId);
  return (
    <main>
      <h1>Olá!</h1>
      {
        loading ? isLoading() : dataDrinks && dataDrinks.map((item, index) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strCategory,
            // strArea,
            strInstructions,
            // strTags,
            strIngredient1,
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
                    {strIngredient1.map((itemIng, indexIng) => (
                      <ol key={ indexIng }>
                        <li
                          data-testid={ `${indexIng}-ingredient-name-and-measure` }
                        >
                          {itemIng}
                        </li>
                      </ol>
                    ))}
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
                      Inicar Receita
                    </button>
                  </section>
                </div>
              </section>
            );
          }
          return ('Error');
        })
      }
    </main>
  );
}

export default DrinksDetails;
