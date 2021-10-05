import React from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export const checkFavorite = (recipeId) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes !== null) {
    favoriteRecipes.map((item) => {
      if (recipeId === item.id) {
        localStorage.setItem('isFavorite', true);
      } else {
        localStorage.setItem('isFavorite', false);
      } return ('');
    });
  }
  localStorage.setItem('isFavorite', false);
};

export const renderFavorite = (favoriteClick) => {
  const isFavorite = JSON.parse(localStorage.getItem('isFavorite'));
  if (isFavorite) {
    return (
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ favoriteClick }
      >
        <img
          src={ blackHeartIcon }
          alt="Favoritar"
        />
      </button>
    );
  }
  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ favoriteClick }
    >
      <img
        src={ whiteHeartIcon }
        alt="Favoritar"
      />
    </button>
  );
};
