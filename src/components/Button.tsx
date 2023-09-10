import React from "react";

interface Props {
  children: string;
  color: string;
  onclick: () => void;
}

const Button = ({ children, color, onclick }: Props) => {
  return (
    <button className={"btn btn-" + color} onClick={onclick}>
      {children}
    </button>
  );
};

export default Button;
