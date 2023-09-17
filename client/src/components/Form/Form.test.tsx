import { render, fireEvent } from "@testing-library/react";
import Form from "./Form";

describe("Form component", () => {
  it("calls onSubmit with valid form data when submitted", () => {
    const mockOnSubmit = jest.fn();
    const { getByTestId } = render(
      <Form onSubmit={mockOnSubmit}>
        <input type="text" name="username" data-testid="username-input" />
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </Form>
    );

    const usernameInput = getByTestId("username-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);

    const submittedData = mockOnSubmit.mock.calls[0][0];
    expect(submittedData.get("username")).toBe("testuser");
  });

  it("does not call onSubmit with invalid form data", () => {
    const mockOnSubmit = jest.fn();
    const { getByTestId } = render(
      <Form onSubmit={mockOnSubmit}>
        <input
          type="text"
          name="username"
          data-testid="username-input"
          required
        />
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </Form>
    );

    const submitButton = getByTestId("submit-button");

    fireEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
