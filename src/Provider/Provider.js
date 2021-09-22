import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';
import queryFoodsApi from '../services';

function Provider({ children }) {
  const [data, setData] = useState([]);

  const contextValue = {
    ...data,
    setData,
    queryFoodsApi,
  };

  useEffect(() => {
    setData(queryFoodsApi());
  }, []);

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
