import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MyContext from '../context/myContext';
import Footer from '../components/Footer';

function Foods() {
  const {
    meals,
    loading,
    // setData,
    // recipesApi: {
    // queryFirstLetter,
    // queryIngredient,
    // queryName,
    // },
    fetchDataMeals,
  } = useContext(MyContext);

  // const [dataMeals, setDataMeals] = useState([]);

  const maxNumberMeals = 12;
  const mealsFiltered = (arrMeals) => {
    if (arrMeals && arrMeals.length > maxNumberMeals) {
      return arrMeals.filter((item, index) => (
        index < maxNumberMeals
      ));
    }
    return arrMeals;
  };

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     setDataMeals(queryName());
  //   };
  //   fetchdata();
  // }, []);

  useEffect(() => {
    fetchDataMeals();
    // setDataMeals(queryFirstLetter('a'));
    // const { meals } = dataMeals;
    // setDataMeals(mealsFiltered(dataMeals)); // Não se se vai funcionar...
  }, []);

  const isLoading = () => <p>loading...</p>;
  return (
    <div>
      <Header title="Comidas" searchIcone />
      {loading ? isLoading()
        : mealsFiltered(meals) && mealsFiltered(meals).map((item, index) => {
          const { strMeal, strMealThumb } = item;
          return (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                style={ { width: '300px' } }
                data-testid={ `${index}-card-img` }
              />
            </div>
          );
        })}
      <Footer />
    </div>
  );
}

export default Foods;
