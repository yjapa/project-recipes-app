import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';

function Provider({ children }) {
  const [user, setUser] = useState({});

  const contextValue = {
    userInformation: {
      user,
      setUser,
    },
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
