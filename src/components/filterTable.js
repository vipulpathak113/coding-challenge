/* eslint-disable array-callback-return */
import React from "react";

export default function FilterTable(Component) {
  return function WrappedComponent({ isLoading, ...props }) {
    const { apidata } = props;

    const [showCountries, setShowCountries] = React.useState(false);

    const [filterPopulation, setFilterPopulation] = React.useState("");
    const [value, setValue] = React.useState("");

    const handleClear = () => {
      setFilterPopulation("")
      setValue("");
    };

    let filteredData = apidata.filter((val) => {
      // if search is empty or nothing is selected return the entire array
      if (value === "" && filterPopulation === "") {
        return val;

        // if the filterPopulation is not selected, return whats included with the search term
      } else if (
        filterPopulation === "" &&
        val.name.toLowerCase().includes(value.toLowerCase())
      ) {
        return val;

        // if search is empty and filterPopulation drop down value exists return what matches with the filterPopulation
      } else if (
        value === "" &&
        Number(val.population) < Number(filterPopulation)
      ) {
        return val;

        // if there neither are empty do logic here
      } else if (
        value !== "" &&
        filterPopulation !== "" &&
        val.name.toLowerCase().includes(value.toLowerCase())
      ) {
        val.name.toLowerCase().includes(value.toLowerCase());
        return val;
      }
    });

    if (!isLoading)
      return (
        <>
          <div>
            <div className="filter-table">
              <div className="left-side-btn">
                <input
                  className="style-input"
                  type="text"
                  id="country"
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  value={value}
                  placeholder="Country Name"
                />
                <select
                  className="style-input"
                  name="population"
                  id="population-select"
                  onChange={(e) => {
                    setFilterPopulation(e.target.value);
                  }}
                >
                  <option value="">Population</option>
                  <option value="1000000"> {`< 1 M`} </option>
                  <option value="5000000"> {`< 5 M`} </option>
                  <option value="10000000"> {`< 10 M`} </option>
                </select>
                <button className="clear-btn" onClick={handleClear}>
                  Clear
                </button>
              </div>
              <div className="right-side-btn">
                <button
                  className="show-all-btn"
                  onClick={() => setShowCountries(true)}
                >
                  Show all Countries
                </button>
              </div>
            </div>
          </div>
          <Component
            {...props}
            apidata={filteredData}
            showCountries={showCountries}
          />
        </>
      );
    return <p>Hold on, fetching data might take some time.</p>;
  };
}
