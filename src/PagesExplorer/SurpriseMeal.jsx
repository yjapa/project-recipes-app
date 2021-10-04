import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useEffect, useContext } from 'react';
import MyContext from '../context/myContext';


function SurpriseMeal() {
  const { getMealsSurprise } = useContext(MyContext);

  // useEffect(() => {
  //   getMealsSurprise()
  // },[])

  return(
    <section>
      <Header title='Receita surpresa' />
      <Footer />
    </section>
  )
}

export default SurpriseMeal;