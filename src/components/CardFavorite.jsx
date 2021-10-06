import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import FavoritesRecipes from '../pages/FavoritesRecipes';

const CardFavorite = (
  {
    key,
    indexProps,
    strID,
    strType,
    sourceImage,
    strRecipeName,
    strCategory,
    strArea,
    strAlcoholicOrNot,
    fnRemoveFavoriteRecipe,
  },
) => {
  const location = useLocation();

  const handleClickShareIcon = () => {
  // executa a função que o joao fez
    // const fullUrl = window.location.href;
    const fullURL = location.pathname;
    console.log(fullURL);
  };

  return (
    <div>
      <div key={ key }>
        <img
          alt={ sourceImage }
          data-testid={ `${indexProps}-horizontal-image` }
          src={ sourceImage }
        />
        <p data-testid={ `${indexProps}-horizontal-name` }>{ strRecipeName }</p>
        <p data-testid={ `${indexProps}-horizontal-top-text` }>
          { strType === 'comida' ? strCategory : strAlcoholicOrNot }
        </p>
        { strType === 'comida' ? <p>{ strArea }</p> : null }
        <button type="button" onClick={ handleClickShareIcon }>
          <img
            alt="search-icon"
            data-testid={ `${indexProps}-horizontal-share-btn` }
            src={ shareIcon }
          />
        </button>
        <button type="button" onClick={ () => fnRemoveFavoriteRecipe(strID.toString()) }>
          <img
            alt="black-heart"
            // data-testid={ `${indexProps}-horizontal-share-btn` }
            src={ blackHeartIcon }
          />
        </button>
      </div>
    </div>

  );
};

CardFavorite.propTypes = {
  indexProps: PropTypes.number,
  sourceImage: PropTypes.string,
  strCategory: PropTypes.string,
  strRecipeName: PropTypes.string,
}.isRequired;

export default CardFavorite;
