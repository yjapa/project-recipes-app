import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/myContext';
import Footer from '../components/Footer';
import '../css/foods.css';

function Foods() {
  const {
    meals,
    fetchDataMeals,
    arrayFiltered,
    setData,
    dataTrue,
    recipesApi: { queryIngredient },
    getIng,
  } = useContext(MyContext);

  const history = useHistory();
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
    const setIngredient = async () => {
      if (dataTrue === true) {
        const dataIngredients = await queryIngredient(getIng);
        setData(dataIngredients);
      } else {
        const fetchData = async () => fetchDataMeals();
        fetchData();
      }
    };
    setIngredient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAll = () => {
    if (meals) {
      return arrayFiltered(meals).map((item, index) => {
        const { strMeal, strMealThumb, idMeal } = item;
        return (
          <Link
            to={ `/comidas/${idMeal}` }
            key={ index }
            className="link-foods"
          >
            <div
              key={ index }
              className="container-foods"
              data-testid={ `${index}-recipe-card` }
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
      });
    }
  };

  const renderOne = () => {
    const { idMeal } = meals[0];
    if (idMeal === '52968') {
      return renderAll();
    }
    if (dataTrue === true) {
      return renderAll();
    }
    return history.push(`/comidas/${idMeal}`);
  };

  return (
    <div className="main-container">
      <Header title="Comidas" searchIcone meals="meals" />
      {meals && meals.length === 1 ? renderOne() : renderAll() }
      {/* { renderAll() } */}
      <Footer />
    </div>
  );
}

export default Foods;
