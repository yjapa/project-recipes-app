// import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import MyContext from '../context/myContext';

function HeaderInput() {
  const [recipe, setRecipe] = useState('');

  const {
    queryIngredient,
    queryName,
    queryFirstLetter,
    setData } = useContext(MyContext);

  const handleClick = async () => {
    const { recipeFilter, searchRecipe } = recipe;
    if (recipeFilter === 'ingredient') {
      const resultApi = await queryIngredient(searchRecipe);
      setData(resultApi);
      console.log(resultApi);
    } else if (recipeFilter === 'name') {
      const resultApi = await queryName(searchRecipe);
      setData(resultApi);
      console.log(resultApi);
    } else {
      const resultApi = await queryFirstLetter(searchRecipe);
      setData(resultApi);
      console.log(resultApi);
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

// HeaderInput.propTypes = {

// }.isRequired;

export default HeaderInput;
