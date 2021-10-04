import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/myContext';

function SurpriseMeal() {
  const { getMealSurprise } = useContext(MyContext);

  useEffect(() => {
    getMealSurprise();
  }, []);

  return (
    <section>
      <Header title="Receita surpresa" />
      <Footer />
    </section>
  );
}

export default SurpriseMeal;
