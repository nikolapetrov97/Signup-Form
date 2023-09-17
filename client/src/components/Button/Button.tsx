import "./Button.css";
import { ButtonHTMLAttributes } from "react";

type Props = {
  variant: "primary" | "secondary";
  children: any;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ variant, children, ...rest }: Props) => {
  return (
    <button {...rest} className={`button button-${variant}`}>
      {children}
    </button>
  );
};

export default Button;
