import React, { useContext } from 'react';
import Header from '../components/Header';
import MyContext from '../context/myContext';

function Foods() {
  const { meals, loading } = useContext(MyContext);
  const isLoading = () => <p>loading...</p>;
  return (
    <div>
      <Header title="Comidas" searchIcone />
      {loading ? isLoading() : meals && meals.map((item, index) => {
        const { strMeal, strMealThumb } = item;
        return (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
            <img
              src={ strMealThumb }
              alt={ strMeal }
              style={ { width: '300px' } }
              data-testid={ `${index}-card-img` }
            />
          </div>
        );
      })}
    </div>
  );
}

export default Foods;
