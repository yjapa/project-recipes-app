import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';
import { useLocation } from 'react-router-dom';
import { withRouter } from 'react-router';
import MyContext from '../context/myContext';

function HeaderInput() {
  const [recipe, setRecipe] = useState('');
  const location = useLocation();

  const {
    recipesApi: {
      queryIngredient,
      queryName,
      queryFirstLetter,
    },
    drinksApi: {
      queryIngredientDrink, // Está com erro no alert
      queryNameDrink,
      queryFirstLetterDrink,
    },
    setLoading,
    setData,
    setDataDrinks,
  } = useContext(MyContext);

  const updateDataMeals = (resultApiForMeals) => {
    setData(resultApiForMeals);
    setLoading(false);
  };

  const updateDataDrinks = (resultApiForDrinks) => {
    setDataDrinks(resultApiForDrinks);
    setLoading(false);
  };

  const displayAlertNotFoundList = () => {
    setLoading(false);
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const updateStates = (resultApiForMeals, resultApiForDrinks) => {
    const { drinks } = resultApiForDrinks;
    const { meals } = resultApiForMeals;
    // const { searchRecipe } = recipe;
    if ((location.pathname) === '/comidas') {
      console.log(meals);
      return (meals === null) ? displayAlertNotFoundList()
        : updateDataMeals(resultApiForMeals);
    }
    if ((location.pathname) === '/bebidas') {
      return (drinks === null) ? displayAlertNotFoundList()
        : updateDataDrinks(resultApiForDrinks);
    }
  };

  const handleClick = async () => {
    const { recipeFilter, searchRecipe } = recipe;
    let resultApi;
    let resultApiDrinks;
    switch (recipeFilter) {
    case 'ingredient':
      if (recipeFilter && searchRecipe) {
        console.log('entrou no case ingredient');
        setLoading(true);
        resultApi = await queryIngredient(searchRecipe);
        resultApiDrinks = await queryIngredientDrink(searchRecipe);
        updateStates(resultApi, resultApiDrinks);
      } else {
        displayAlertNotFoundList();
      }
      break;
    case 'name':
      setLoading(true);
      resultApi = await queryName(searchRecipe);
      resultApiDrinks = await queryNameDrink(searchRecipe);
      updateStates(resultApi, resultApiDrinks);
      break;
    case 'firstLetter':
      if (!searchRecipe || searchRecipe.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        setLoading(true);
        resultApi = await queryFirstLetter(searchRecipe);
        resultApiDrinks = await queryFirstLetterDrink(searchRecipe);
        updateStates(resultApi, resultApiDrinks);
      }
      break;
    default:
      setLoading(false);
      break;
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  return (
    <div>
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          id="search-input"
          name="searchRecipe"
          onChange={ handleChange }
          type="text"
        />
      </label>
      <label htmlFor="ingredient-search-radio">
        Ingrediente
        <input
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
          name="recipeFilter"
          onChange={ handleChange }
          type="radio"
          value="ingredient"
        />
      </label>
      <label htmlFor="name-search-radio">
        Nome
        <input
          data-testid="name-search-radio"
          id="name-search-radio"
          name="recipeFilter"
          onChange={ handleChange }
          type="radio"
          value="name"
        />
      </label>
      <label htmlFor="primeiraLetra">
        Primeira letra
        <input
          data-testid="first-letter-search-radio"
          id="primeiraLetra"
          name="recipeFilter"
          onChange={ handleChange }
          type="radio"
          value="firstLetter"
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Entrar
      </button>
    </div>
  );
}

HeaderInput.propTypes = {
  pathname: PropTypes.func,
}.isRequired;

export default withRouter(HeaderInput);
