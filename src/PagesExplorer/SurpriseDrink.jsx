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
          // console.log(results.drinks)
        });
      });
    }
    getDrink();
  }, []);

   function openDrink() {
    if (drink[0]) {
    const { strAlcoholic, strDrinkThumb, strDrink, strCategory } = drink[0];
   return ( 
          <div>
            <h3>{strDrink}</h3>
            <span>{strAlcoholic}</span>
            <br/>
            <span>{ strCategory }</span>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              style={ { width: '300px' } }
              />
          </div>
        )
   }

  }

  return (
    <section>
      <div>
        <Header title="Receita surpresa" />
        {  openDrink() } 
        <Footer />
      </div>
    </section>
  );
} 

export default SurpriseDrink;
