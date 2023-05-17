import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import axios from "axios";

jest.mock("axios");

describe("App", () => {
  it("renders the title", async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Country's Info")).toBeInTheDocument();
    });
  });
});
