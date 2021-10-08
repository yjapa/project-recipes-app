import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dropdown from '../components/Dropdown';

function MealsArea() {
  const [urlRequest, setUrlRequest] = useState([]);
  const [mealsArea, setMealsArea] = useState([]);

  useEffect(() => {
    const fetchRequest = async () => {
      const request = await fetch(urlRequest);
      const json = await request.json();
      setMealsArea(json.meals);
    };
    fetchRequest();
  }, [urlRequest]);

  return (
    <div>
      <Header title="Explorar Origem" />
      <Dropdown setUrlRequest={ setUrlRequest } />
      { (mealsArea.length !== 0) && mealsArea
        .filter((_, index) => index < Number('12'))
        .map(({ strMeal, strMealThumb, idMeal }, i) => (
          <Link to={ `/comidas/${idMeal}` } key={ i }>
            <div data-testid={ `${i}-recipe-card` }>
              <h3 data-testid={ `${i}-card-name` }>{strMeal}</h3>
              <img
                src={ strMealThumb }
                data-testid={ `${i}-card-img` }
                alt={ strMeal }
                style={ { width: '180px' } }
              />
            </div>
          </Link>
        )) }
      <Footer />
    </div>
  );
}

export default MealsArea;
