import PropTypes from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import { Link } from 'react-router-dom';

const CardRecipeDone = (
  {
    Key,
    strID,
    strType,
    indexProps,
    sourceImage,
    strRecipeName,
    strCategory,
    strArea,
    dtFinishDate,
    arrTags,
    strAlcoholicOrNot,
  },
) => {

  // Source: https://newbedev.com/copy-url-to-clipboard-react-code-example
  const handleClickShareIcon = () => {
    const fullURL = window.location.href;
    navigator.clipboard.writeText(fullURL);
  };

  return (
  <div Key={ Key } >
    <div>
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
      <p data-testid={ `${indexProps}-horizontal-top-text` }>{ strType === 'comida' ? strCategory : strAlcoholicOrNot }</p>
      { strType === 'comida' ? <p>{ strArea }</p> : null }
      <p data-testid={ `${indexProps}-horizontal-done-date` }>{ dtFinishDate }</p>
      <button type="button" onClick={ handleClickShareIcon }>
        <img
          alt="search-icon"
          data-testid={ `${indexProps}-horizontal-share-btn` }
          src={ shareIcon }
        />
      </button>
    </div>
    <div>
      {strType === 'comida' ? arrTags.split(', ').map((tagName, index) => (
        <button
        data-testid={`${index}-${tagName}-horizontal-tag`}
        type="button"
          key={ index }
          >
            { tagName }
        </button>
      )) : null }
    </div>
  </div>
  )
};

CardRecipeDone.propTypes = {
  Key: PropTypes.string,
  arrTags: PropTypes.shape({
    split: PropTypes.func
  }),
  dtFinishDate: PropTypes.string,
  indexProps: PropTypes.string,
  sourceImage: PropTypes.string,
  strAlcoholicOrNot: PropTypes.string,
  strArea: PropTypes.string,
  strCategory: PropTypes.string,
  strID: PropTypes.string,
  strRecipeName: PropTypes.string,
  strType: PropTypes.string
}.isRequired

export default CardRecipe;
