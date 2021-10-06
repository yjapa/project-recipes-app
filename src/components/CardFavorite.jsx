import PropTypes from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { Link } from 'react-router-dom';
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

  // Source: https://newbedev.com/copy-url-to-clipboard-react-code-example
  const handleClickShareIcon = () => {
    const fullURL = window.location.href;
    navigator.clipboard.writeText(fullURL);
  };

  return (
    <div>
      <div key={ key }>
        <Link
            to={ strType === 'comida' ? `/comidas/${strID}` : `/bebidas/${strID}` }
        >
          <img
            alt={ sourceImage }
            data-testid={ `${indexProps}-horizontal-image` }
            src={ sourceImage }
          />
        </Link>
        <Link
            to={ strType === 'comida' ? `/comidas/${strID}` : `/bebidas/${strID}` }
        >
          <p data-testid={ `${indexProps}-horizontal-name` }>{ strRecipeName }</p>
        </Link>
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
            src={ blackHeartIcon }
            data-testid="favorite-btn"
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
