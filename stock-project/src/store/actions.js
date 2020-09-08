import axios from "axios";
export const loadData = ({ commit }) => {
  axios
    .get("/data.json")
    .then((res) => {
      const data = res.data;
      if (data) {
        const stocks = data.stocks;
        const funds = data.funds;
        const stockPortfolio = data.stockPortfolio;

        const portfolio = {
          stockPortfolio,
          funds
        };

        commit("SET_STOCKS", stocks);
        commit("SET_PORTFOLIO", portfolio);
      }
    })
    .catch((error) => console.log(error));
  // Vue.http
  //   .get("data.json")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data) {
  //       const stocks = data.stocks;
  //       const funds = data.funds;
  //       const stockPortfolio = data.stockPortfolio;

  //       const portfolio = {
  //         stockPortfolio,
  //         funds
  //       };

  //       commit("SET_STOCKS", stocks);
  //       commit("SET_PORTFOLIO", portfolio);
  //     }
  //   });
};
