import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function IngredDrinks() {
  const [drink, setDrink] = useState([]);
  useEffect(() => {
    function getCocktails() {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      fetch(url).then((response) => {
        response.json().then((data) => {
          const results = data;
          setDrink(results.drinks);
        });
      });
    }
    getCocktails();
  }, []);
  const numbers = 12;
  return (
    <section>
      <Header title="Escolha Por Ingrediente" />
      {drink && drink.slice(0, numbers).map((item, index) => {
        const { strIngredient1 } = item;
        return (
          <button
            type="button"
            key={ index }
            // onClick={ () => handleClick(strIngredient1) }
            className="link-foods"
          >
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{strIngredient1}</h3>
              <img
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient1}.png` }
                alt={ strIngredient1 }
                style={ { width: '250px' } }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </button>
        );
      })}
      <Footer />
    </section>
  );
}

export default IngredDrinks;
