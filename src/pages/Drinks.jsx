import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/myContext';
import Footer from '../components/Footer';

function Drinks() {
  const { dataDrinks, loading, fetchDataDrinks, arrayFiltered } = useContext(MyContext);
  const { drinks } = dataDrinks;
  const isLoading = () => <p>loading...</p>;

  useEffect(() => {
    const fetchData = async () => fetchDataDrinks();
    fetchData();
  }, []);

  return (
    <div>
      <Header title="Bebidas" searchIcone />
      {loading ? isLoading()
        : arrayFiltered(drinks) && arrayFiltered(drinks).map((item, index) => {
          const { strDrink, strDrinkThumb, idDrink } = item;
          console.log(item);
          return (
            <Link to={ `/bebidas/${idDrink}` } key={ index }>
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  style={ { width: '300px' } }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            </Link>
          );
        })}
      <Footer />
    </div>
  );
}

export default Drinks;
