const queryFoodsApi = async (query) => {
  const url = `www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const request = await fetch(url);
  const results = request.json();
  return results;
};

export default queryFoodsApi;
