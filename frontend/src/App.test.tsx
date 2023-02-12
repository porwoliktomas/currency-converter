import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders heading", () => {
  render(<App />);
  const el = screen.getByText(/Currency converter/i);
  expect(el).toBeInTheDocument();
});
