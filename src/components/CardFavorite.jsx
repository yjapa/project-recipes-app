import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router';
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
  const [boolLinkCopied, setBoolLinkCopied] = useState(false);

  const detailsPath = (type, id) => (type === 'comida' ? `/comidas/${id}`
    : `/bebidas/${id}`);

  // Source: https://newbedev.com/copy-url-to-clipboard-react-code-example
  const handleClickShareIcon = () => {
    const domain = `${window.location.protocol}//${window.location.host}`;
    const fullURL = `${domain}${detailsPath(strType, strID)}`;
    navigator.clipboard.writeText(fullURL);
    setBoolLinkCopied(true);
  };

  return (
    <div>
      <div key={ key }>
        <Link
          to={ detailsPath(strType, strID) }
        >
          <img
            alt={ sourceImage }
            data-testid={ `${indexProps}-horizontal-image` }
            src={ sourceImage }
            style={ { width: '180px' } }
          />
          <p data-testid={ `${indexProps}-horizontal-name` }>{ strRecipeName }</p>
        </Link>
        <p data-testid={ `${indexProps}-horizontal-top-text` }>
          { strType === 'comida' ? `${strArea} - ${strCategory}` : strAlcoholicOrNot }
        </p>
        <button type="button" onClick={ handleClickShareIcon }>
          <img
            alt="search-icon"
            data-testid={ `${indexProps}-horizontal-share-btn` }
            src={ shareIcon }
          />
        </button>
        <span>{ boolLinkCopied ? 'Link copiado!' : null}</span>
        <button type="button" onClick={ () => fnRemoveFavoriteRecipe(strID.toString()) }>
          <img
            alt="black-heart"
            src={ blackHeartIcon }
            data-testid={ `${indexProps}-horizontal-favorite-btn` }
          />
        </button>
      </div>
    </div>

  );
};

CardFavorite.propTypes = {
  fnRemoveFavoriteRecipe: PropTypes.func,
  indexProps: PropTypes.string,
  key: PropTypes.string,
  sourceImage: PropTypes.string,
  strAlcoholicOrNot: PropTypes.string,
  strArea: PropTypes.string,
  strCategory: PropTypes.string,
  strID: PropTypes.shape({
    toString: PropTypes.func,
  }),
  strRecipeName: PropTypes.string,
  strType: PropTypes.string,
}.isRequired;

export default CardFavorite;
