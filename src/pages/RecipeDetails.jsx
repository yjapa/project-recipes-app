import React from 'react';

function RecipeDetails() {
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src=""
        alt=""
      />
      <h1
        data-testid="recipe-title"
      >
        Recipe title
      </h1>
      <h3
        data-testid="recipe-category"
      >
        Category
      </h3>
      <h2>
        Ingredients
      </h2>
      <ul>
        <li>Ingredient</li>
      </ul>
      <h2>
        Instructions
      </h2>
      <p
        data-testid="instructions"
      >
        instruction text
      </p>
      <h2>
        Video
      </h2>
      <p
        data-testid="video"
      >
        Link para o video
      </p>
      <h2>
        Recommended
      </h2>

    </div>

  );
}
