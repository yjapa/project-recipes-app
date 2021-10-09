import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import MyContext from '../context/myContext';

const Login = () => {
  const history = useHistory();
  const { loginState, setLoginState } = useContext(MyContext);

  const handleChange = ({ target: { name, value } }) => {
    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  const emailRegex = /\S+@\S+\.\S+/;
  const validationPass = 6;
  const dsb = !(emailRegex
    .test(loginState.email) && loginState.password.length > validationPass);

  const handleClick = () => {
    localStorage.mealsToken = 1;
    localStorage.cocktailsToken = 1;
    const userEmail = {
      email: loginState.email,
    };
    const inProgressRecipes = {
      cocktails: {},
      meals: {},
    };
    localStorage.user = JSON.stringify(userEmail);
    localStorage.inProgressRecipes = JSON.stringify(inProgressRecipes);
    history.push('/comidas');
  };

  return (
    <div>
      <label htmlFor="email">
        E-mail:
        <input
          data-testid="email-input"
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          onChange={ handleChange }
        />
      </label>
      Senha:
      <label htmlFor="password">
        <input
          data-testid="password-input"
          type="password"
          name="password"
          id="password"
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ dsb }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;
