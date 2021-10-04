// // import React, { useContext, useEffect, useState } from 'react';
// import React, { useEffect } from 'react';
// // import Footer from '../components/Footer';
// // import Header from '../components/Header';
// // import MyContext from '../context/myContext';

// function SurpriseDrink() {
//   // const { getDrinkSurprise } = useContext(MyContext);
//   // const [drink, setDrink] = useState([]);
//   // const [loading, setLoading] = useState(false);
//   // const isLoading = () => <span>loading...</span>;

//   //   function drinkSurprise(getDrinkSurprise) {
//   //     const drinks = getDrinkSurprise
//   //     drinks.map((drink, index) => { <div key={index}> <div>{drink }</div> })
//   //     return drinkSurprise;
//   // }
//   // function get() {
//   //   return(
//   //   getDrinkSurprise()
//   //  )

//   //   getDrinkSurprise = async() => {
//   //   const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
//   //   const request = await fetch(url);
//   //   const results = request.json();
//   //   return results;

//   // }

//   // }
//   //  console.log(getDrinkSurprise)

//   //   useEffect(() => {
//   //     getDrinkSurprise(results);
//   //      results = {results}
//   //      setDrink(rersults)
//   //      getDrinkSurprise()
//   //     console.log(results)
//   // }, []);

//   const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
//   useEffect(() => {
//     function getDrink() {
//       fetch(url).then((r) => {
//         r.json().then((re) => {
//           const results = re;
//           setDrink(results);
//           console.log(results, 'aqui');
//         });
//       });
//     }
//     getDrink();
//   }, []);

//   //  function handleClick() {
//   //         {drink.map((d) => {
//   //         const { idDrink, strAlcoholic <div value={ d } key={ d }>{ d }</div>})}
//   //       }

//   // function openDrink() {

//   //  {drink.map((d) => <div value={ d } key={ d }>{ d }</div>)}
//   //  return openDrink

//   // }

//   // return (
//   //   <section>
//   //     <Header title="Receita surpresa" />
//   //     <Footer />
//   //     <div>
//   //       {loading ? isLoading()
//   //         : Array.from(drink).map((d) => {
//   //           const { idDrink, strAlcoholic, strDrinkThumb, strDrink } = d;
//   //           return (
//   //             <div>
//   //               <div value={ d } key={ idDrink }>{ d }</div>

//   //               <h3>{strDrink}</h3>
//   //               <span>{strAlcoholic}</span>
//   //               <img
//   //                 src={ strDrinkThumb }
//   //                 alt={ strDrink }
//   //                 style={ { width: '300px' } }
//   //               />
//   //             </div>
//   //           );
//   //         })}
//   //     </div>
//   //     <button
//   //       type="button"
//   //     >
//   //       Abrir receita surpresa
//   //     </button>
//   //   </section>
//   // );
// }

// export default SurpriseDrink;
