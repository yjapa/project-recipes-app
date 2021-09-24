import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function FoodsDetails() {
  const { meals, loading } = useContext(MyContext);
  const isLoading = () => <p>loading...</p>;
  return (
    <main>
      {loading ? isLoading() : meals && meals.map((item, index) => {
        const {
          strMeal,
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
              <h2>{strMeal}</h2>
              <img src={ strMealThumb } alt={ strMeal } />
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
                  Video
                </video>
              </section>
            </div>
          </section>
        );
      })}
    </main>
  );
}

export default FoodsDetails;
