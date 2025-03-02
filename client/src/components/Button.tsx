import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md transition-all font-medium",
        {
          "bg-amber-300 text-slate-700 hover:bg-amber-700 text-white":
            variant === "primary",
          "bg-gray-200 text-gray-800 hover:bg-gray-300":
            variant === "secondary",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
