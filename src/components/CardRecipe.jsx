import PropTypes from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';

const CardRecipe = (
  {
    indexProps,
    sourceImage,
    strCategory,
    strRecipeName,
    dtRecipeDone,
    arrTags,
  },
) => (
  <div>
    <div>
      <img
        alt={ sourceImage }
        data-testid={ `${indexProps}-horizontal-image` }
        src={ sourceImage }
      />
      <span data-testid={ `${indexProps}-horizontal-top-text` }>{ strCategory }</span>
      <span data-testid={ `${indexProps}-horizontal-name` }>{ strRecipeName }</span>
      <span data-testid={ `${indexProps}-horizontal-done-date` }>{ dtRecipeDone }</span>
      <img
        alt="search-icon"
        data-testid={ `${indexProps}-horizontal-share-btn` }
        src={ shareIcon }
      />
    </div>
    <div>
      {arrTags.map((item, index) => (
        <button type="button" key={ index }>{ item }</button>
      ))}
    </div>
  </div>
);

CardRecipe.propTypes = {
  arrTags: PropTypes.array,
  dtRecipeDone: PropTypes.string,
  index: PropTypes.string,
  sourceImage: PropTypes.string,
  strCategory: PropTypes.string,
  strRecipeName: PropTypes.string,
}.isRequired;

export default CardRecipe;
