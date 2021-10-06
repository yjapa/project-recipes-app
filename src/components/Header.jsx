import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Categories from './Categories';
import HeaderInput from './HeaderInputs';
import '../css/header.css';
import MyContext from '../context/myContext';

function Header({ title, searchIcone }) {
  const [showFilter, setFilter] = useState(false);
  const { loginState } = useContext(MyContext);

  useEffect(() => {
    const saveProgress = JSON.parse(localStorage.getItem('user'));
    if (saveProgress === null) {
      const userEmail = {
        email: loginState.email,
      };
      localStorage.user = JSON.stringify(userEmail);
    }
  }, []);

  const renderSearchBar = () => (
    <div className="container-button">
      <button
        type="button"
        onClick={ () => setFilter(!showFilter) }
        className="search-button"
      >
        <img
          alt="search-icon"
          data-testid="search-top-btn"
          src={ searchIcon }
        />
      </button>
    </div>
  );

  return (
    <header>
      <div className="top-header">
        <Link to="/perfil">
          <img
            alt="profile-icon"
            data-testid="profile-top-btn"
            src={ profileIcon }
          />
        </Link>
        <h2 data-testid="page-title" className="title">{title}</h2>
        { searchIcone && renderSearchBar() }
      </div>
      {showFilter && <HeaderInput />}
      {searchIcone && <Categories />}
    </header>
  );
}

Header.propTypes = {
  searchIcone: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;

// '{"email":"email@mail.com"}'
// '{ "email": "email@mail.com" }'
