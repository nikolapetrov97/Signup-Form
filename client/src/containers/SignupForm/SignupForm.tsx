import "./SignupForm.css";
import { faUser, faAt, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import DriveLogo from "../../assets/drive-logo.png";
import GmailLogo from "../../assets/gmail-logo.png";
import GoogleLogo from "../../assets/google-logo.png";

type Props = {
  onSubmit: (data: FormData) => void;
};

const SignupForm = ({ onSubmit }: Props) => {
  const handleButtonClick = (link: string) => {
    const newTab = window.open(link, "_blank");

    if (newTab) {
      newTab.focus();
    }
  };

  const renderExternalButton = (img: string, link: string) => (
    <Button
      type="button"
      variant="secondary"
      onClick={() => handleButtonClick(link)}
    >
      <img alt="google" height={20} width={20} src={img} />
    </Button>
  );

  return (
    <div className="form-wrapper">
      <Form onSubmit={onSubmit}>
        <h2 className="bold-text">Sign up</h2>
        <img alt="gmail" className="form-icon" src={GmailLogo} />
        <div className="inputs-wrapper">
          <Input
            icon={<FontAwesomeIcon icon={faUser} size="xl" />}
            placeholder="First Name"
            id="firstName"
            name="firstName"
            errorText="Required"
            required
          />
          <Input
            icon={<FontAwesomeIcon icon={faUser} size="xl" />}
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            errorText="Required"
            required
          />
        </div>
        <Input
          icon={<FontAwesomeIcon icon={faAt} size="xl" />}
          placeholder="Email Address"
          id="email"
          name="email"
          type="email"
          errorText="The email you provided is not valid"
          required
        />
        <Input
          icon={<FontAwesomeIcon icon={faKey} size="xl" />}
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          errorText={`Password should be minimum 8 symbols string, should contain at least one upper case, 
    at least one lower case, at least one digit and at least one special symbol`}
          pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          required
        />
        <Input
          label="I agree with the terms and conditions"
          id="terms"
          name="terms"
          errorText="Required"
          type="checkbox"
          required
        />
        <Button type="submit" variant="primary" className="signup-button">
          Sign up
        </Button>
        <h4 className="text">sponsored by</h4>
        <div className="buttons-wrapper">
          {renderExternalButton(GoogleLogo, "https://google.com")}
          {renderExternalButton(DriveLogo, "https://www.google.com/drive/")}
          {renderExternalButton(GmailLogo, "https://gmail.com")}
        </div>
        <h3 className="text">
          Already have an account? <u className="sign-in">Sign in</u>
        </h3>
      </Form>
    </div>
  );
};

export default SignupForm;
