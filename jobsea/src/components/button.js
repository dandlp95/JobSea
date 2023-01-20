import React from "react";
import btnCSS from "./button.module.css";

const Button = (props) => {
  return (
    <div className={btnCSS.btnCSS}>
      <button onClick={() => props.clickAction()} className={btnCSS.btn}>
        {props.btnText}
      </button>
    </div>
  );
};

export default Button;
