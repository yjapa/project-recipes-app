import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MyContext from '../context/myContext';

function Categories() {
  const {
    recipesApi: {
      categoriesMeals,
      fetchDataMealsByCategory,
    },
    drinksApi: {
      categoriesDrinks,
      fetchDataDrinksByCategory,
    },
    fetchDataMeals,
    fetchDataDrinks,
  } = useContext(MyContext);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  const MAX_BUTTONS = 5;

  const fetchCategoriesMeals = async () => {
    const dataCategoriesMeals = await categoriesMeals();
    setCategories(dataCategoriesMeals.meals);
  };

  const fetchCategoriesDrinks = async () => {
    const dataCategoriesDrinks = await categoriesDrinks();
    setCategories(dataCategoriesDrinks.drinks);
  };

  useEffect(() => {
    const fetchData = async () => ((location.pathname === '/comidas')
      ? fetchCategoriesMeals() : fetchCategoriesDrinks());
    fetchData();
  }, []);

  const procedureToUpdateFoodsPage = async (strCategory) => (
    toggle === false
      ? fetchDataMeals() : fetchDataMealsByCategory(strCategory));

  const procedureToUpdateDrinksPage = async (strCategory) => (toggle === false
    ? fetchDataDrinks() : fetchDataDrinksByCategory(strCategory));

  useEffect(() => {
    if (location.pathname === '/comidas') {
      procedureToUpdateFoodsPage(category);
    } else {
      procedureToUpdateDrinksPage(category);
    }
  }, [toggle]);

  const handleClick = (strCategory) => {
    setToggle(!toggle);
    setCategory(strCategory);
  };

  return (
    <div>
      {categories && categories.slice(0, MAX_BUTTONS).map(({ strCategory }, index) => (
        <div key={ index }>
          <button
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            onClick={ () => handleClick(strCategory) }
          >
            {strCategory}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Categories;
