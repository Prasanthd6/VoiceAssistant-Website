import React from "react";
import './button.css';

const Button = ({ text, onClick, style, type = "button", variant = "primary" }) => {
  const variants = {
      primary: "primary-button",
      secondary: "secondary-button",
      danger: "danger-button",
  };

  return (
      <button
          type={type}
          onClick={onClick}
          style={style}
          className={`custom-button ${variants[variant]}`}>
          {text}
      </button>
  );
};

export default Button;