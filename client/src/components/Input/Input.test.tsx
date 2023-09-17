import { render } from "@testing-library/react";
import Input from "./Input";

describe("Input component", () => {
  it("renders with a label", () => {
    const { getByPlaceholderText } = render(
      <Input id="test-input" name="test" placeholder="Test Label" />
    );
    const input = getByPlaceholderText("Test Label");
    expect(input).toBeInTheDocument();
  });

  it("renders with an icon", () => {
    const { getByTestId } = render(
      <Input
        id="test-input"
        name="test"
        icon={<i data-testid="test-icon">icon</i>}
      />
    );
    const icon = getByTestId("test-icon");
    expect(icon).toBeInTheDocument();
  });
});
