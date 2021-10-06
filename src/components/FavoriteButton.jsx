import React from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export const checkFavorite = (recipeId) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes !== null) {
    if (favoriteRecipes.filter((e) => e.id === recipeId).length > 0) {
      localStorage.setItem('isFavorite', true);
    } else {
      localStorage.setItem('isFavorite', false);
    }
  }
};

export const renderFavorite = (favoriteClick) => {
  const isFavorite = JSON.parse(localStorage.getItem('isFavorite'));
  if (isFavorite) {
    return (
      <button
        type="button"
        onClick={ favoriteClick }
      >
        <img
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          alt="Favoritar"
        />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={ favoriteClick }
    >
      <img
        data-testid="favorite-btn"
        src={ whiteHeartIcon }
        alt="Favoritar"
      />
    </button>
  );
};
