import "./Input.css";
import { FormEvent, InputHTMLAttributes, useState } from "react";

type Props = {
  id: string;
  name: string;
  label?: string;
  errorText?: string;
  icon?: any;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ icon, label, errorText, id, ...rest }: Props) => {
  const isCheckbox = rest?.type === "checkbox";
  const [validationMessage, setValidationMessage] = useState<string>("");
  const wrapperClassName = isCheckbox
    ? `checkbox-wrapper`
    : !!validationMessage
    ? "input-wrapper-error"
    : "input-wrapper";

  const onInvalid = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setValidationMessage(target.validationMessage);
  };

  const onBlur = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    if (!!validationMessage) {
      setValidationMessage(target.validationMessage);
    }
  };

  const onFocus = (e: FormEvent) => {
    if (!!validationMessage) {
      setValidationMessage("");
    }
  };

  const onClick = (e: FormEvent) => {
    if (isCheckbox) return;
    const target = e.target as HTMLInputElement;

    if (!!validationMessage) {
      setValidationMessage(target.validationMessage);
    }
  };

  return (
    <div className={wrapperClassName}>
      {icon && (
        <div className="icon-wrapper">
          <i className="input-icon">{icon}</i>
        </div>
      )}
      <input
        id={id}
        className="input"
        onInvalid={onInvalid}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        {...rest}
      />
      {isCheckbox && <label htmlFor={id}>{label}</label>}

      {!!validationMessage && (
        <div className="error-message">
          {errorText || validationMessage}
          <div className="tooltip-arrow" />
        </div>
      )}
    </div>
  );
};

export default Input;
