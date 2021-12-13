import "./Button.css";
import React from "react";

const Button = function ({text}) {
  return (
    <button type="button" className="genericButton">
      {text}
    </button>
  );
};
const EventButton = function ({text, event}) {
  return (
    <button
      type="button"
      className="genericButtons"
      onClick={() => {
        event();
      }}
    >
      {text}
    </button>
  );
};
export {EventButton};
export default Button;
