import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

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
    <div Key={ Key }>
      <div>
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
        <p data-testid={ `${indexProps}-horizontal-done-date` }>{ dtFinishDate }</p>
        <button type="button" onClick={ handleClickShareIcon }>
          <img
            alt="search-icon"
            data-testid={ `${indexProps}-horizontal-share-btn` }
            src={ shareIcon }
          />
        </button>
        <span>{ boolLinkCopied ? 'Link copiado!' : null}</span>
      </div>
      <div>
        {console.log('arrTags dentro do card', arrTags)}
        { arrTags && arrTags.map((tagName, index) => (
          <div
            data-testid={ `${indexProps}-${tagName}-horizontal-tag` }
            key={ index }
          >
            { tagName }
          </div>
        )) }
      </div>
    </div>
  );
};

CardRecipeDone.propTypes = {
  Key: PropTypes.string,
  arrTags: PropTypes.shape({
    split: PropTypes.func,
  }),
  dtFinishDate: PropTypes.string,
  indexProps: PropTypes.string,
  sourceImage: PropTypes.string,
  strAlcoholicOrNot: PropTypes.string,
  strArea: PropTypes.string,
  strCategory: PropTypes.string,
  strID: PropTypes.string,
  strRecipeName: PropTypes.string,
  strType: PropTypes.string,
}.isRequired;

export default CardRecipeDone;
