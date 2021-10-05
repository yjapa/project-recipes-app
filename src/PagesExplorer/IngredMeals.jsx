import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function IngredMeals() {
  // const [ingredients, setIngrediente] = useState([]);

  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  useEffect(() => {
    function getIngrImg() {
      fetch(url).then((response) => {
        response.json().then((data) => {
          const results = data;
          console.log(results.meals, 'veja');
          // setIngrediente(results.meals)
        });
      });
    }
    getIngrImg();
  }, []);

  // useEffect(() => {
  //   const getMeall = async () => {
  //     const url = 'www.themealdb.com/api/json/v1/1/list.php?i=list';
  //     const request = await fetch(url);
  //     const results = request.json();
  //     const res = results;
  //     console.log(res.meals);
  //   };
  //   getMeall();
  // }, []);

  // function ingrdImg() {
  //   if(ingredients[1]) {
  //     const { ingredient } = ingredients;
  //     return (
  //     <div>
  //     { ingredient }
  //     </div>
  //     )
  //   }
  // }

  return (

    <section>
      <Header title="Escolha Por Ingrediente" />

      <Footer />
    </section>
  );
}

export default IngredMeals;
