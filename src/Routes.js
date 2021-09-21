import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Perfil from './pages/Perfil';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/perfil" component={ Perfil } />
    </Switch>
  );
}

export default Routes;

// Tela de login: /;
// Tela principal de receitas de comidas: /comidas;
// Tela principal de receitas de bebidas: /bebidas;
// Tela de detalhes de uma receita de comida: /comidas/{id-da-receita};
// Tela de detalhes de uma receita de bebida: /bebidas/{id-da-receita};
// Tela de receita em processo de comida: /comidas/{id-da-receita}/in-progress;
// Tela de receita em processo de bebida: /bebidas/{id-da-receita}/in-progress;
// Tela de explorar: /explorar;
// Tela de explorar comidas: /explorar/comidas;
// Tela de explorar bebidas: /explorar/bebidas;
// Tela de explorar comidas por ingrediente: /explorar/comidas/ingredientes;
// Tela de explorar bebidas por ingrediente: /explorar/bebidas/ingredientes;
// Tela de explorar comidas por local de origem: /explorar/comidas/area;
// Tela de perfil: /perfil;
// Tela de receitas feitas: /receitas-feitas;
// Tela de receitas favoritas: /receitas-favoritas.
