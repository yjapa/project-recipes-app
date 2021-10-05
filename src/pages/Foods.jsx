import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/myContext';
import Footer from '../components/Footer';
import '../css/foods.css';

function Foods() {
  const {
    meals,
    loading,
    fetchDataMeals,
    arrayFiltered,
  } = useContext(MyContext);
  const isLoading = () => <p>loading...</p>;
  // Outra maneira para filtrar array
  // ===========================
  // useEffect(() => {
  //   const newArray = [];
  //   const MAX_FOODS = 12;
  //   if (meals) {
  //     meals.map((item, index) => {
  //       if (index < MAX_FOODS) {
  //         return newArray.push(item);
  //       }
  //       return newArray;
  //     });
  //     setNewData(newArray);
  //   }
  // }, [meals]);
  // ===========================

  useEffect(() => {
    const fetchData = async () => fetchDataMeals();
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main-container">
      <Header title="Comidas" searchIcone meals="meals" />
      {loading ? isLoading()
        : arrayFiltered(meals) && arrayFiltered(meals).map((item, index) => {
          const { strMeal, strMealThumb, idMeal } = item;
          return (
            <Link to={ `/comidas/${idMeal}` } key={ index } className="link-foods">
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
                className="container-foods"
              >
                <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  className="image-foods"
                  style={ { width: '180px' } }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            </Link>
          );
        })}
      <Footer />
    </div>
  );
}

export default Foods;
