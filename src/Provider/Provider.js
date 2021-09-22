import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';
import { queryIngredient, queryName, queryFirstLetter } from '../services';

function Provider({ children }) {
  const [data, setData] = useState([]);

  const contextValue = {
    ...data,
    setData,
    queryFirstLetter,
    queryIngredient,
    queryName,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
