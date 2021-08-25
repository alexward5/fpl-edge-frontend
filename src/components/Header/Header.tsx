import React from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";

function Header() {
  return (
    <div className="navContainer">
      <div className="navButtonsContainer">
        <Button size="large">Line Chart</Button>
        <Button size="large">Radar Chart</Button>
      </div>
    </div>
  );
}

export default Header;
