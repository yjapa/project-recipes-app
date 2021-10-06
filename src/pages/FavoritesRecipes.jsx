import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';

const FavoritesRecipes = () => {
  // estado do componente que contém o array de receitas favoritas que será renderizado nos cards;
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  // função que atualiza o estado conforme o botão "desfavoritar" é acionado;
  const updateFavoriteRecipesArray = () => {
    const json = localStorage.getItem('favoriteRecipes');
    const favoriteRecipesObj = JSON.parse(json);
    setFavoriteRecipes(favoriteRecipesObj);
    console.log('favoriteRecipesObj', favoriteRecipesObj);
  };

  const removeFavoriteRecipe = (strIdItem) => {
    // obtem o array de receitas favoritas no localStorage
    const arrayStringfyFavRecipes = localStorage.getItem('favoriteRecipes');
    const arrayObjFavRecipes = JSON.parse(arrayStringfyFavRecipes);
    // filtra pela exceção
    console.log('arrayFavRecipes', arrayObjFavRecipes);
    const favoriteArrayUpdated = arrayObjFavRecipes.filter((item) => (
      item.id !== strIdItem
    ));
    console.log(favoriteArrayUpdated);
    // atualiza o localStorage
    localStorage.setItem('favoriteRecipes', favoriteArrayUpdated);
    // atualiza o estado que está no componente pai para chamar a renderização com o array atualizado
    setFavoriteRecipes(favoriteArrayUpdated);
  };

  useEffect(() => (
    updateFavoriteRecipesArray()
  ), []);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </div>
      { favoriteRecipes && favoriteRecipes.map((item, index) => (
        <CardFavorite
          Key={ index }
          indexProps={ index }
          strID={ item.id }
          strType={ item.type }
          sourceImage={ item.image }
          strRecipeName={ item.name }
          strCategory={ item.category }
          strArea={ item.area }
          strAlcoholicOrNot={ item.alcoholicOrNot }
          fnRemoveFavoriteRecipe={ removeFavoriteRecipe }
        />
      ))}
    </div>
  );
};

export default FavoritesRecipes;
