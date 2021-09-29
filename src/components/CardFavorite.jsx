import PropTypes from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const CardFavorite = (
  {
    indexProps,
    sourceImage,
    strCategory,
    strRecipeName,
  },
) => (
  <div>
    <div>
      <img
        alt="share-icon"
        data-testid={ `${indexProps}-horizontal-image` }
        src={ sourceImage }
      />
      <span data-testid={ `${indexProps}-horizontal-top-text` }>{ strCategory }</span>
      <span data-testid={ `${indexProps}-horizontal-name` }>{ strRecipeName }</span>
      <img
        alt="search-icon"
        data-testid={ `${indexProps}-horizontal-share-btn` }
        src={ shareIcon }
      />
      <img
        alt="black-heart"
        // data-testid={ `${indexProps}-horizontal-share-btn` }
        src={ blackHeartIcon }
      />
    </div>
  </div>
);

CardFavorite.propTypes = {
  indexProps: PropTypes.number,
  sourceImage: PropTypes.string,
  strCategory: PropTypes.string,
  strRecipeName: PropTypes.string,
}.isRequired;

export default CardFavorite;
