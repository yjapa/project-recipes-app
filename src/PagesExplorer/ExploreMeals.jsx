import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useHistory }  from 'react-router-dom';

function ExploreMeals() {

  const history = useHistory();

  function handleIngredient() {
    history.push('/explorar/comidas/ingredientes')
  }
  function handleArea() {
    history.push('/explorar/comidas/area')
  }
  function handleMeSurpreenda(){
  history.push('/explorar/comidas/receitaComidaSurpresa')
  }

  return (
    <div>
      <Header title="Explorar comidas"/>
      <Footer />
    <div>  
      <button
      type="button"
      data-testid="explore-by-ingredient"
      onClick={ handleIngredient }
      >
      Por Ingrediente
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ handleArea }
        >Por Local de Origem
      </button>
      <button
        type=""
        data-testid="explore-surprise"
        onClick={ handleMeSurpreenda }
        >Me Surpreenda!
      </button>
    </div>  
  </div>
  );
}

export default ExploreMeals;
