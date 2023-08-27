import { useEffect, MouseEventHandler, CSSProperties } from "react";
import React from "react";
import btnCSS from "./button.module.css";

type Props = {
  clickAction: MouseEventHandler,
  btnText: string, 
  styleRules: CSSProperties
}

const Button:React.FunctionComponent<Props> = ({clickAction, btnText, styleRules}: Props) => {
  
  return (
    <div className={btnCSS.btnCSS}>
      <button onClick={clickAction} className={btnCSS.btn} style={styleRules}>
        {btnText}
      </button>
    </div>
  );
};

export default Button;