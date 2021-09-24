import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';
import {
  queryIngredient,
  queryName,
  queryFirstLetter,
  queryFirstLetterDrink,
  queryIngredientDrink,
  queryNameDrink } from '../services';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDataMeals = async () => {
    const dataToOpen = await queryFirstLetter('a');
    setData(dataToOpen);
  };

  const contextValue = {
    ...data, // fiquei na dúvida quanto a utilização desse spread operator
    dataDrinks,
    setData,
    setDataDrinks,
    loading,
    setLoading,
    fetchDataMeals,
    recipesApi: {
      queryFirstLetter,
      queryIngredient,
      queryName,
    },
    drinksApi: {
      queryFirstLetterDrink,
      queryIngredientDrink,
      queryNameDrink,
    },
  };

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
