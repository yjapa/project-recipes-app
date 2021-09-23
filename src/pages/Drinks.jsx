import React, { useContext } from 'react';
import Header from '../components/Header';
import MyContext from '../context/myContext';
import Footer from '../components/Footer';

function Drinks() {
  const { dataDrinks, loading } = useContext(MyContext);
  const { drinks } = dataDrinks;
  const isLoading = () => <p>loading...</p>;
  return (
    <div>
      <Header title="Bebidas" searchIcone />
      {loading ? isLoading() : drinks && drinks.map((item, index) => {
        const { strDrink, strDrinkThumb } = item;
        return (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              style={ { width: '300px' } }
              data-testid={ `${index}-card-img` }
            />
          </div>
        );
      })}
      <Footer />
    </div>
  );
}

export default Drinks;
