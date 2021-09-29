import React from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';

// Preciso saber de onde virão os dados favoritados sejam eles comidas ou bebidas

const FavoritesRecipes = () => (
  <div>
    <Header title="Receitas Favoritas" />
    <div>
      <button data-testid="filter-by-all-btn" type="button">All</button>
      <button data-testid="filter-by-food-btn" type="button">Food</button>
      <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
    </div>
    { arrayQueContemAListaDeFavoritos.map((item, index) => (
      <CardFavorite
        Key={ index }
        indexProps={ index }
        sourceImage={ item }
        strCategory={ item }
        strRecipeName={ item }
      />
    ))}
  </div>
);

export default FavoritesRecipes;
