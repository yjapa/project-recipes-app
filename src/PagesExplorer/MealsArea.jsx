import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function MealsArea() {
  const [mealArea, setMealArea] = useState([]);
  const [recipes, setRecipes] = useState({
    country: 'American',
  });
  console.log(recipes);
  // const maxNumberIt = 12;

  // const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian'
  // const urlALL = 'www.themealdb.com/api/json/v1/1/list.php?a=list'
  console.log(recipes);
  useEffect(() => {
    function getMealArea() {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then((response) => {
          response.json().then((data) => {
            const results = data;
            setMealArea(results.meals);
          });
        });
    }
    getMealArea();
  }, []);

  const handleChange = ({ target: { value } }) => {
    setRecipes({
      country: value,
    });
  };

  return (
    <section>
      <Header title="Explorar Origem" />
      <select data-testid="explore-by-area-dropdow" onChange={ handleChange }>
        { mealArea && mealArea.map((item, index) => {
          const { strArea } = item;
          return (
            <option key={ index } value={ strArea } id={ index }>{ strArea }</option>
          );
        }) }
      </select>
      <Footer />
    </section>
  );
}
export default MealsArea;
