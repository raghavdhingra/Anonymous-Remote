import React from "react";
import "./card.scss";

const Card = ({ variant, children, isShadow, className }) => {
  const variantClass = {
    dark: "dark",
    default: "default",
  };

  return (
    <div
      className={`card card__${variantClass[variant] || variantClass.default} ${
        className || ""
      } card__${isShadow ? "shadow" : ""}`}
    >
      {children}
    </div>
  );
};

export default Card;
