import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
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
  const [renderIngredients, setRenderIngredient] = useState([]);
  const { mealId } = useParams();

  const maxNumberIt = 12;

  const arrayFiltered = (arr) => {
    if (arr && arr.length > maxNumberIt) {
      return arr.filter((_, index) => (
        index < maxNumberIt
      ));
    }
    return arr;
  };

  // ========================================================================================================
  // Função para juntar os Ingredientes com as Medidas

  const listIngredients = (DataDetails, ingredients) => {
    const number = 20;
    if (DataDetails && DataDetails.length !== 0) {
      for (let i = 1; i <= number; i += 1) {
        if (DataDetails[0][`strIngredient${i}`]) {
          const ing = `${DataDetails[0][`strIngredient${i}`]}`;
          const mes = `${DataDetails[0][`strMeasure${i}`]}`;
          ingredients.push(`${ing} ${(mes === 'null') ? '' : mes}`);
        } else break;
      }
    }
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
  // Fetch para atuar nos toggles buttons disponíveis no Header através do Componente "Categories"

  const fetchDataMealsByCategory = async (strCategory) => {
    const dataToOpen = await arrayFiltered(fetchCategoryMeal(strCategory));
    setData(dataToOpen);
  };

  const fetchDataDrinksByCategory = async (strCategory) => {
    const dataToOpen = await arrayFiltered(fetchCategoryDrink(strCategory));
    setDataDrinks(dataToOpen);
  };
  // ========================================================================================================

  // =====================================================================
  // Source: https://masteringjs.io/tutorials/fundamentals/filter-key
  // Versão adaptada:

  const filterObjectByKeyValue = (objToFilter, strToSearch) => {
    const obj = objToFilter[0]; // Sempre o primeiro índice do array (que é um objeto).
    return Object.keys(obj)
      .filter((key) => key.includes(strToSearch))
      .reduce((curr, key) => (({ ...curr, [key]: obj[key] })), {});
  };

  // =====================================================================

  const displayIngredientsAndMeasures = (arr, stringOne, stringTwo) => {
    const objIngredients = filterObjectByKeyValue(arr, stringOne);
    const objMeasures = filterObjectByKeyValue(arr, stringTwo);
    const arrIngredients = Object.entries(objIngredients).filter((item) => item[1]);
    console.log('arrIngredients', arrIngredients);
    const arrMeasures = Object.entries(objMeasures).filter((item) => item[1]);
    console.log('arrMeasures', arrMeasures);
    const listItens = arrIngredients.map((_, index) => (
      <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
        {`${arrIngredients[index][1]} - ${arrMeasures[index][1]}`}
      </li>
    ));
    return listItens;
  };

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
    filterObjectByKeyValue,
    displayIngredientsAndMeasures,
    listIngredients,
    renderIngredients,
  };

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
