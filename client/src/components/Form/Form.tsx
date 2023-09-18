import { useRef } from "react";
import "./Form.css";

interface Props {
  action?: string;
  children: React.ReactNode;
  onSubmit: (data: FormData) => void;
}

const Form = ({ action, children, onSubmit }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const isValid = formElement.checkValidity();
    if (isValid) {
      const dataObject = new FormData(formElement);
      onSubmit(dataObject);
      if (formRef.current) {
        formRef?.current.reset();
      }
    }
  };

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={handleSubmit}
      noValidate
      className="form"
    >
      {children}
    </form>
  );
};

export default Form;
