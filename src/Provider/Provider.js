import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';
import {
  queryDefaultMeals,
  queryIngredient,
  queryName,
  queryFirstLetter,
  queryDefaultDrinks,
  queryFirstLetterDrink,
  queryIngredientDrink,
  queryNameDrink,
  categoriesMeals,
  categoriesDrinks,
  fetchCategoryMeal,
  fetchCategoryDrink,
} from '../services';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const maxNumberIt = 12;

  const arrayFiltered = (arr) => {
    if (arr && arr.length > maxNumberIt) {
      return arr.filter((item, index) => (
        index < maxNumberIt
      ));
    }
    return arr;
  };

  // ========================================================================================================
  // Fetch para atuar na montagem das paginas "Food" e "Drinks"

  const fetchDataMeals = async () => {
    const dataToOpen = await arrayFiltered(queryDefaultMeals());
    setData(dataToOpen);
  };

  const fetchDataDrinks = async () => {
    const dataToOpen = await arrayFiltered(queryDefaultDrinks());
    setDataDrinks(dataToOpen);
  };

  // ========================================================================================================
  // Fetch para atuar nos toogles buttons disponíveis no Header através do Componente "Categories"

  const fetchDataMealsByCategory = async (strCategory) => {
    const dataToOpen = await arrayFiltered(fetchCategoryMeal(strCategory));
    setData(dataToOpen);
  };

  const fetchDataDrinksByCategory = async (strCategory) => {
    const dataToOpen = await arrayFiltered(fetchCategoryDrink(strCategory));
    setDataDrinks(dataToOpen);
  };
  // ========================================================================================================

  const contextValue = {
    ...data,
    dataDrinks,
    setData,
    setDataDrinks,
    loading,
    setLoading,
    fetchDataMeals,
    fetchDataDrinks,
    recipesApi: {
      queryDefaultMeals,
      queryFirstLetter,
      queryIngredient,
      queryName,
      categoriesMeals,
      fetchDataMealsByCategory,
    },
    drinksApi: {
      queryDefaultDrinks,
      queryFirstLetterDrink,
      queryIngredientDrink,
      queryNameDrink,
      categoriesDrinks,
      fetchDataDrinksByCategory,
    },
    arrayFiltered,
  };

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
