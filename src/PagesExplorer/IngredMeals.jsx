import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/myContext';

function IngredMeals() {
  const { setDataIng, recipesApi: { queryIngredient },
    setDataTrue } = useContext(MyContext);
  const [ingredients, setIngredient] = useState([]);
  const history = useHistory();
  useEffect(() => {
    function getIng() {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      fetch(url).then((response) => {
        response.json().then((data) => {
          const results = data;
          setIngredient(results.meals);
        });
      });
    }
    getIng();
  }, []);

  const handleClick = async (str) => {
    setDataTrue(true);
    const results = await queryIngredient(str);
    setDataIng(results.meals);
    history.push('/comidas');
  };

  const numbers = 12;
  return (
    <section>
      <Header title="Escolha Por Ingrediente" />
      {ingredients && ingredients.slice(0, numbers).map((item, index) => {
        const { strIngredient } = item;
        return (
          <button
            type="button"
            key={ index }
            onClick={ () => handleClick(strIngredient) }
            className="link-foods"
          >
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{strIngredient}</h3>
              <img
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}.png` }
                alt={ strIngredient }
                style={ { width: '250px' } }
                data-testid={ `${index}-card-img` }
              />
            </div>
          </button>
        );
      })}
      <Footer />
    </section>
  );
}

export default IngredMeals;
