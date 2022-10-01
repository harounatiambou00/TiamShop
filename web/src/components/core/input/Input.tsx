import React from "react";

type Props = {
  id: string;
  type: string;
  label: string;
  placholder: string;
  value: number | string;
  handleChange: () => void;
  showPassord?: boolean;
  setShowPassword?: (value: boolean) => void;
  isOnError: boolean;
  errorMessage: string;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input = (props: Props) => {
  return (
    <div>
      <label htmlFor={`#${props.id}`}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placholder}
        value={props.value}
        onChange={() => props.handleChange()}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => props.handleBlur(e)}
      />
    </div>
  );
};

export default Input;
