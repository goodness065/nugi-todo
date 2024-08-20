import "@radix-ui/themes/styles.css";
import { Theme, Spinner } from "@radix-ui/themes";

import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  title?: string;
  className?: string;
  [x: string]: unknown;
  isLoading?: boolean;
  icon?: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
};

const buttonStyles = cva(
  [
    "flex items-center h-10 justify-center text-base font-normal py-2 px-6 rounded-lg",
    "shadow-boxShadow-xs disabled:bg-gray-400 disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      intent: {
        primary: "bg-brandBlue border border-brandBlue text-white text-white",
        secondary: "bg-white border border-brandBlue text-brandBlue",
      },
      centered: {
        true: "mx-auto",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

interface Props extends ButtonProps, VariantProps<typeof buttonStyles> {}

const Button = ({
  href,
  title,
  className,
  intent,
  centered,
  icon,
  isLoading,
  ...props
}: Props) => {
  if (isLoading) {
    return (
      <button
        disabled={isLoading}
        type="button"
        className={twMerge(
          `${buttonStyles({ intent, centered })}  ${className as string} cursor-not-allowed border-none`
        )}
        {...props}
      >
        <Theme>
          <Spinner size="3" />
        </Theme>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={twMerge(
        `${buttonStyles({ intent, centered })}  ${className as string}`
      )}
      {...props}
    >
      {title}
      {icon ?? null}
    </button>
  );
};

export default Button;
