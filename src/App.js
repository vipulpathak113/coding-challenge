import Table from "./components/table";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterTable from "./components/filterTable";

function App() {
  const [apidata, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const FilteredTable = FilterTable(Table)

  useEffect(() => {
    axios.get("https://api.sampleapis.com/countries/countries").then((res) => {
      setApiData(res.data);
      setIsLoading(false)
    });
  }, []);

  return (
    <div className="App">
      <h3 className="title">Country's Info</h3>
      <FilteredTable apidata={apidata} isLoading={isLoading} />
    </div>
  )
}

export default App;
