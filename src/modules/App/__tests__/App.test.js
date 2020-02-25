import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders buttons", () => {
  const { getByText } = render(<App />);
  const buttonTextOnePlayer = getByText(/1 Player/i);
  const buttonTextTwoPlayers = getByText(/2 Players/i);
  const buttonTextRestart = getByText(/Restart/i);
  expect(buttonTextOnePlayer).toBeInTheDocument();
  expect(buttonTextTwoPlayers).toBeInTheDocument();
  expect(buttonTextRestart).toBeInTheDocument();
});
