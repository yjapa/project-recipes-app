import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function MealsArea() {

  const [mealArea, setMealArea] = useState([]);
   const maxNumberIt = 12;

  // const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian'
  // const urlALL = 'www.themealdb.com/api/json/v1/1/list.php?a=list'

  useEffect(() => {
    function getMealArea() {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => {
      response.json().then((data) => {
        const results = data;
        // console.log(results.meals)
        setMealArea(results.meals.slice(0, maxNumberIt));
      })
    })
  }
    getMealArea();
  },[]);

  
//    const maxNumberIt = 12;

// const filteredArea() {
//     if (arr && arr.length > maxNumberIt) {
//       return arr.filter((_, index) => (
//         index < maxNumberIt
//       ));
//     }
//     return filteredArea;
//   };

  //    mealArea && mealArea.map((item, index) => {
  //    const { idMeal,strMeal, strMealThumb } = item;
  //    return (
  //    <select key={ index } data-testid="explore-by-area-dropdow" >
  //       <option id={ idMeal }>{ strMeal }</option>  
  //    </select>
  //     )
  //   })
  // }
     
      
   // <img
        //   src={ strMealThumb }
        //   alt={ item }
        //   style={ { width: '100px' } }
        //   data-testid="explore-by-area-dropdow"
        // />
  
  // <option id="" [data-testid="${area}-option"]>{ item }</option>  
  // 
  
  return (
    <section>
      <Header title="Explorar Origem" />
    {/* <select id="origem" data-testid="explore-by-area-dropdow">
	<option value="pt" selected>brazil</option>
	<option value="en">canadian</option>
	<option value="es">indian</option>
</select>  */}
      {  mealArea && mealArea.map((item, index) => {
        console.log(mealArea, 'aqui')
     const { idMeal,strMeal, strMealThumb } = item;
     return (
     <select key={ index } data-testid="explore-by-area-dropdow" >
        <option id={ idMeal }>{ strMeal }</option>  
     </select>
      )
    }) }
      <Footer />
    </section>
  );
}
export default MealsArea;

