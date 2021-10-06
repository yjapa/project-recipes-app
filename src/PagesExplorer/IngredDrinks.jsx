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
    <main>
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
            <section key={ index } data-testid={ `${index}-ingredient-card` }>
              <h3 data-testid={ `${index}-card-name` }>{strIngredient1}</h3>
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt={ strIngredient1 }
                style={ { width: '250px' } }
                data-testid={ `${index}-card-img` }
              />
            </section>
          </button>
        );
      })}
      <Footer />
    </main>
  );
}

export default IngredDrinks;
