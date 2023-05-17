/* eslint-disable testing-library/no-wait-for-side-effects */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterTable from "../components/filterTable";

const TestComponent = ({ apidata }) => (
  <ul>
    {apidata.map((data) => (
      <li key={data.name}>{data.name}</li>
    ))}
  </ul>
);

const FilteredTestComponent = FilterTable(TestComponent);

describe("FilterTable", () => {
  it("renders the wrapped component with the correct data", async () => {
    const mockData = [
      { name: "Country 1", population: "100000" },
      { name: "Country 2", population: "2000000" },
      { name: "Country 3", population: "6000000" },
    ];

    render(<FilteredTestComponent apidata={mockData} isLoading={false} />);

    await waitFor(() => {
      expect(screen.getByText("Country 1")).toBeInTheDocument();
    });
    expect(screen.getByText("Country 2")).toBeInTheDocument();
    expect(screen.getByText("Country 3")).toBeInTheDocument();
  });

  it("filters the data by population correctly", async () => {
    const mockData = [
      { name: "Country 1", population: "100000" },
      { name: "Country 2", population: "2000000" },
      { name: "Country 3", population: "6000000" },
    ];

    render(<FilteredTestComponent apidata={mockData} isLoading={false} />);
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole("combobox"), ["5000000"]);
    });
    expect(screen.getByText("Country 1")).toBeInTheDocument();
    expect(screen.getByText("Country 2")).toBeInTheDocument();
    expect(screen.queryByText("Country 3")).not.toBeInTheDocument();
  });

  it("filters the data by country name correctly", async () => {
    const mockData = [
      { name: "Country 1", population: "100000" },
      { name: "Country 2", population: "2000000" },
      { name: "Country 3", population: "6000000" },
    ];

    render(<FilteredTestComponent apidata={mockData} isLoading={false} />);

    await waitFor(() => {
      userEvent.type(screen.queryByRole("textbox"), "Country 2");
    });
    expect(screen.queryByText("Country 1")).not.toBeInTheDocument();
    expect(screen.getByText("Country 2")).toBeInTheDocument();
    expect(screen.queryByText("Country 3")).not.toBeInTheDocument();
  });
});
