// import PropTypes from 'prop-types';
import React from 'react';

function HeaderInput() {
  return (
    <div>
      <label htmlFor="ingrediente">Ingrediente
        <input 
      type="radio" 
      id="ingrediente" 
      data-testid="ingredient-search-radio">
        </input>
      </label>
      <label htmlFor="nome">Nome
        <input 
      type="radio" 
      id="nome" 
      data-testid="name-search-radio">
        </input>
      </label>
      <label htmlFor="primeiraLetra">Primeira letra
        <input 
      type="radio" 
      id="primeiraLetra" 
      data-testid="first-letter-search-radio">
        </input>
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
      >
        Entrar
      </button>
    </div>
  );
}

// HeaderInput.propTypes = {
  
// }.isRequired;

export default HeaderInput;
