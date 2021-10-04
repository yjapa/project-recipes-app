import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';

function ExploreDrinks() {

  const history = useHistory();
 
  function handleIngredient() {
    history.push('/explorar/bebidas/ingredientes');
  }

    function handleMeSurpreenda() {
    history.push('/explorar/bebidas/receitaBebidaSurpresa');
  }

    return (
      <section>
        <div>
          <Header title="Explorar bebidas" />
          <Footer />
        </div>
        <div>  
          <button
          type="button"
          data-testide="explore-by-ingredient"
          onClick={ handleIngredient }
          >
          Por Ingrediente
          </button>
          <button
            type=""
            data-testid="explore-surprise"
            onClick={ handleMeSurpreenda }
            >Me Surpreenda!
          </button>
        </div>
      </section>
  );
}

export default ExploreDrinks;
