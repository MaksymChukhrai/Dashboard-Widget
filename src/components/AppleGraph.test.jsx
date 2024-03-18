import React from "react";
import { render, screen } from "@testing-library/react";
import AppleGraph from "./AppleGraph";

describe("AppleGraph Component", () => {
  test("renders spinner while loading", () => {
    render(<AppleGraph />); // Pass empty props to the AppleGraph component to simulate data loading

    // Check that the spinner is displayed when the data is loaded
    const spinnerElement = screen.getByAltText("Loading...");
    expect(spinnerElement).toBeInTheDocument();
  });
});
