import React, { useContext } from 'react';
import Header from '../components/Header';
import MyContext from '../context/myContext';

function Foods() {
  const { data } = useContext(MyContext);
  const isLoading = <p>loading...</p>;
  return (
    <div>
      <Header title="Comidas" searchIcone />
      {isLoading && data}
    </div>
  );
}

export default Foods;
