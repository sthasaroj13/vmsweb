import React from "react";

interface ButtonProps {
  label?: string;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void); // Update type here
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLButtonElement>;
  Cstyle?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  children,
  ref,
  type = "button",
  disabled,
  Cstyle,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} rounded-[10px]`}
      style={Cstyle}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {label}
      {children}
    </button>
  );
};

export default Button;
