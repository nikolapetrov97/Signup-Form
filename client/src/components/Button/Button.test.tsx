import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("renders with the primary variant", () => {
    const { getByText } = render(
      <Button variant="primary">Primary Button</Button>
    );
    const button = getByText("Primary Button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button-primary");
  });

  it("renders with the secondary variant", () => {
    const { getByText } = render(
      <Button variant="secondary">Secondary Button</Button>
    );
    const button = getByText("Secondary Button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button-secondary");
  });

  it("renders with additional attributes", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button variant="primary" onClick={onClickMock}>
        Click Me
      </Button>
    );
    const button = getByText("Click Me");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button-primary");

    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
