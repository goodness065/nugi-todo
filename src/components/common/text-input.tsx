import { type ChangeEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  placeholder?: string;
  value?: string | number;
  name?: string;
  type?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  [x: string]: unknown;
}

const TextInput = ({
  placeholder,
  value,
  name,
  onChange,
  type,
  className,
  ...props
}: IProps) => {
  return (
    <input
      {...props}
      className={twMerge(
        ` w-full h-12 outline-none p-1 border border-gray-400 rounded-md ${className} placeholder:!text-gray-500`
      )}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
