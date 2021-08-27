import { hot } from "react-hot-loader/root";
import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";

function App() {
  return (
    <div className="appContainer">
      <Header />
      <Body />
    </div>
  );
}

export default hot(App);
