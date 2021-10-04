import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
          data-testid="explore-by-ingredient"
          onClick={ handleIngredient }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleMeSurpreenda }
        >
          Me Surpreenda!
        </button>
      </div>
    </section>
  );
}

export default ExploreDrinks;