import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
// require("dotenv").config();

import SearchBar from "./components/SearchBar/SearchBar";
import StockList from "./components/StockList/StockList";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      stocks: []
    };

    // this.handleClick = this.handleClick.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("App component mounted.");
    axios
      .get("http://localhost:3000/api/stock")
      .then(res => {
        console.log("Res.data: ", res.data);
        this.setState({ stocks: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  // handleClick(e) {
  //   if (e) e.preventDefault();
  //   this.setState({
  //     value: "",
  //     term: this.state.value
  //   });

  //   let term = this.state.value;
  //   // const key = process.env.ALPHA_V;
  //   // const url = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${term}&apikey=${key}`;
  //   const url = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${term}&apikey=RI18ACHK3TCCCQXJ`;

  //   axios
  //     .get(url)
  //     .then(res => {
  //       console.log("Res.data: ", res.data);
  //       let stocks = _.flattenDeep(
  //         Array.from(res.data["Stock Quotes"]).map(stock => [
  //           {
  //             symbol: stock["1. symbol"],
  //             price: stock["2. price"],
  //             volume: stock["3. volume"],
  //             timestamp: stock["4. timestamp"]
  //           }
  //         ])
  //       );
  //       console.log("Stocks: ", stocks);
  //       this.setState((state, props) => {
  //         return {
  //           ...state,
  //           stocks
  //         };
  //       });
  //     })
  //     .catch(error => console.log(error));
  // }

  render() {
    let stocks = this.state.stocks;
    // const value = this.state.value;

    return (
      <div className="App">
        <h1 className="App__Title">FakeInvestor</h1>
        {/* <SearchBar
          value={value}
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        <StockList stockItems={this.state.stocks} /> */}
      </div>
    );
  }
}

export default App;
