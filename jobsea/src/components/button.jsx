import React from "react";
import btnCSS from "./button.module.css";

const Button = (props) => {

  return (
    <div className={btnCSS.btnCSS}>
      <button onClick={props.clickAction} className={btnCSS.btn} style={props.styleRules}>
        {props.btnText}
      </button>
    </div>
  );
};

export default Button;
