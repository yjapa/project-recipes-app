import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, searchIcone }) {
  const [showFilter, setFilter] = useState(false);

  const renderSearchBar = () => (
    <button
      type="button"
      onClick={ () => setFilter(!showFilter) }
    >
      <img
        alt="search-icon"
        data-testid="search-top-btn"
        src={ searchIcon }
      />
    </button>
  );

  return (
    <header>
      <Link to="/perfil">
        <img
          alt="profile-icon"
          data-testid="profile-top-btn"
          src={ profileIcon }
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      { searchIcone && renderSearchBar() }
      { showFilter && <input
        type="text"
        data-testid="search-input"
      />}
    </header>
  );
}

Header.propTypes = {
  searchIcone: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
