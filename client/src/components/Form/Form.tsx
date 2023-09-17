import "./Form.css";

interface Props {
  action?: string;
  children: React.ReactNode;
  onSubmit: (data: FormData) => void;
}

const Form = ({ action, children, onSubmit }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const isValid = formElement.checkValidity();

    // submit the dataObject if isValid===true
    if (isValid) {
      const dataObject = new FormData(formElement);
      onSubmit(dataObject);
    }
  };

  return (
    <form action={action} onSubmit={handleSubmit} noValidate className="form">
      {children}
    </form>
  );
};

export default Form;
