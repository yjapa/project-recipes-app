import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <div>
      <Link to="/perfil">
        <img
          alt="profile-icon"
          data-testid="profile-top-btn"
          src={ profileIcon }
        />
      </Link>
      <h1>{title}</h1>
      <Link to="/explorar">
        <img
          alt="search-icon"
          data-testid="search-top-btn"
          src={ searchIcon }
        />
      </Link>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
