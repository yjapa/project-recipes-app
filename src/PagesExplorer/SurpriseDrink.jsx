import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function SurpriseDrink() {
  const [drink, setDrink] = useState([]);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  useEffect(() => {
    function getDrink() {
      fetch(url).then((r) => {
        r.json().then((re) => {
          const results = re;
          setDrink(results.drinks);
        });
      });
    }
    getDrink();
  }, []);
  function openDrink() {
    if (drink[0]) {
      const { strAlcoholic, strDrinkThumb, strDrink,
        strInstructions, strArea } = drink[0];
      return (
        <main>
          <header>
            <h3>{strDrink}</h3>
          </header>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            style={ { width: '300px' } }
          />
          <section>
            <span>{strArea}</span>
            <span>{strAlcoholic}</span>
            <p>{strInstructions}</p>
          </section>
        </main>
      );
    }
  }

  return (
    <section>
      <div>
        <Header title="Receita surpresa" />
        { openDrink() }
        <Footer />
      </div>
    </section>
  );
}

export default SurpriseDrink;
