import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function SurpriseMeal() {
 
  const [ meal, setMeal ] = useState([]);
  
  const url ='https://www.themealdb.com/api/json/v1/1/random.php' 

  useEffect(() => {
    function getMeal() {
      fetch(url).then((response) => {
      response.json().then((data) =>{
        const results = data;
        setMeal(results.meals);
      })
      })
    }
    getMeal();
  }, []);

  function openMeal() {
    if (meal[0]) {
      const {strMeal, strArea, strCategory, strInstructions,strSource, srtYoutube, strMealThumb } = meal[0];
      return(
        <div>
         <h3>{ strMeal }</h3>
         <span>{ strArea }</span>
         <span>{ strCategory }</span>
         <p>{ strSource }</p>
         <p>{ srtYoutube }</p>
         <img
         src={ strMealThumb }
         alt={ strMeal }
         style={ { width: '300px'} }
         />
         <p>{ strInstructions }</p>
        </div>
      )
    }
  }

  return (
    <section>
      <Header title="Receita surpresa" />
      { openMeal() }
      <Footer />
    </section>
  );
}

export default SurpriseMeal;
