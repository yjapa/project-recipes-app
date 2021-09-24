import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function DrinksDetails() {
  const { dataDrinks, loading } = useContext(MyContext);
  const isLoading = () => <p>loading...</p>;

  return (
    <main>
      {loading ? isLoading() : dataDrinks && dataDrinks.map((item, index) => {
        const {
          strDrink,
          strMealThumb,
          strCategory,
          // strArea,
          strInstructions,
          // strTags,
          strYoutube,
          strIngredient1,
        } = item;
        return (
          <section key={ index }>
            <div>
              <h2>{strDrink}</h2>
              <img src={ strMealThumb } alt={ strDrink } />
              <section>
                <span>{strCategory}</span>
                <p>
                  {strInstructions}
                </p>
                {strIngredient1.map((itemIng, indexIng) => (
                  <ol key={ indexIng }>
                    <li>{itemIng}</li>
                  </ol>
                ))}
              </section>
              <section>
                <video src={ strYoutube }>
                  <track
                    default
                    kind="captions"
                    src=""
                  />
                  video
                </video>
              </section>
            </div>
          </section>
        );
      })}
    </main>
  );
}

export default DrinksDetails;
