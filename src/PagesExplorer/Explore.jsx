import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const history = useHistory();

  function handleClick() {
    history.push('/explorar/comidas');
  }

  function handleClick2() {
    history.push('/explorar/bebidas');
  }
  
  return (
    <section>
      <div>
        <Header title="Explorar" />
        <Footer />
      </div>
      <button
        data-testid="explore-food"
        type="button"
        onClick={ handleClick }
      >
        Explorar comidas
      </button>
      <button
        data-testid="explore-drinks"
        type="button"
        onClick={ handleClick2 }
      >
        Explorar bebidas
      </button>
    </section>

  );
}

export default Explore;
