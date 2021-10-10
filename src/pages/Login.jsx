import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';
import '../css/login.css';

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
      <div className="container-login">
        <div>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              type="text"
              className="login_email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={ handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              data-testid="password-input"
              type="password"
              placeholder="Senha"
              name="password"
              id="password"
              onChange={ handleChange }
            />
          </label>
        </div>
        <div>
          <button
            data-testid="login-submit-btn"
            className="login_btn"
            type="button"
            disabled={ dsb }
            onClick={ handleClick }
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
