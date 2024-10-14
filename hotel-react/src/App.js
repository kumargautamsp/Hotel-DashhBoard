import fetchData from "./data";
import { useState, useEffect } from "react";
import VisitorChart from "./VisitorChart";
import VisitorCountryChart from "./VisitorCountryChart";
import SparklineCharts from "./SparklineChart";

function App() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState(""); 

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const filteredData = data.filter((item) => {
    const arrivalDate = new Date(
      `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`
    );
    const start = new Date(startDate);
    const end = new Date(endDate);
    return arrivalDate >= start && arrivalDate <= end;
  });
  console.log(filteredData);

  return (
    <div className="App">
      <div className="flex justify-center items-center my-6 text-4xl font-bold text-gray-800">
        <h1>Dashboard</h1>
      </div>
      <div>
        <div className="flex justify-center items-center">
          <label htmlFor="startDate" className="mr-2">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            onChange={(e) => setStartDate(e.target.value)}
            min="2015-07-01"
            max="2015-08-31"
          />
          <label htmlFor="endDate" className="ml-4 mr-2">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            onChange={(e) => setEndDate(e.target.value)}
            min="2015-07-01"
            max="2015-08-31"
          />
        </div>
        <div className="flex flex-row justify-between my-6 px-8 gap-7 mt-9">
          <div className="p-4 rounded-lg border-2 border-gray-300 w-1/3">
            <div className="text-lg font-bold">Total Visitors</div>
            <div className="text-4xl font-bold">12,345</div>
          </div>
          <div className="p-4 rounded-lg border-2 border-gray-300 w-1/3">
            <div className="text-lg font-bold">Visitor Origin Countries</div>
            <div className="text-4xl font-bold">34</div>
          </div>
          <div className="p-4 rounded-lg border-2 border-gray-300 w-1/3">
            <div className="text-lg font-bold">Daily Average Visitors</div>
            <div className="text-4xl font-bold">123</div>
          </div>
        </div>
      </div>
      {filteredData.length > 0 && (
        <>
          <VisitorChart data={filteredData} />
          <VisitorCountryChart data={filteredData} />
          <SparklineCharts data={filteredData} />
        </>
      )}
    </div>
  );
}

export default App;
