import React, { useRef, useState } from "react";
import "./App.css";
import Graphs from "./Graphs";
import Sarima from "./Sarima";
import PieChartComponent from "./Piechart";
import Commodities from "./Commodities";
import Chart from "./Predicted";
import SelectOptions from "./select";
import Prices from "./Dashboard";
import PriceForecast from "./forecast";
import Footer from './footer'

const Home = () => {
    const refs = {
        graphs: useRef(null),
        pieChart: useRef(null),
        predictedGraph: useRef(null),
        predictedPieChart: useRef(null),
        forecast: useRef(null),
        commodities: useRef(null),
        selectOptions: useRef(null),
        chart: useRef(null),
      };
    
      // State for Search Functionality
      const [searchQuery, setSearchQuery] = useState("");
    
      // Function to handle scrolling
      const scrollToSection = (key) => {
        if (refs[key]?.current) {
          refs[key].current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };
    
      // Search Functionality
      const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        if (query.includes("graph")) scrollToSection("graphs");
        else if (query.includes("pie chart")) scrollToSection("pieChart");
        else if (query.includes("predicted graph")) scrollToSection("predictedGraph");
        else if (query.includes("predicted pie chart")) scrollToSection("predictedPieChart");
        else if (query.includes("forecast")) scrollToSection("forecast");
        else if (query.includes("commodities")) scrollToSection("commodities");
        else if (query.includes("select options")) scrollToSection("selectOptions");
        else if (query.includes("chart")) scrollToSection("chart");
      };
    
    return (<div>
        <div className="App">
      {/* Dashboard Navigation */}
      <div className="dashboard">
        <input
          type="text"
          placeholder="Search Dashboard..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => scrollToSection("graphs")}>Crop Price Graph</button>
        <button onClick={() => scrollToSection("pieChart")}>Pie Chart</button>
        <button onClick={() => scrollToSection("chart")}>Chart</button>
        <button onClick={() => scrollToSection("selectOptions")}>Predicted Pie Chart</button>
        {/* <button onClick={() => scrollToSection("predictedGraph")}>Predicted Graph</button> */}
        <button onClick={() => scrollToSection("predictedPieChart")}>Predicted Graph</button>
        <button onClick={() => scrollToSection("forecast")}>Forecast</button>
        <button onClick={() => scrollToSection("commodities")}>Trending Commodities</button>
      </div>

      {/* Graphs & Pie Chart (Same Row) */}
      <div className="box-container row">
        <div className="box half-width" ref={refs.graphs}>
          <Graphs />
        </div>
        <div className="box half-width" ref={refs.pieChart}>
          <PieChartComponent />
        </div>
      </div>

      {/* Chart & Select Options (Same Row) */}
      <div className="box-container row">
        <div className="box half-width" ref={refs.chart}>
          <Chart />
        </div>
        <div className="box half-width" ref={refs.selectOptions}>
          <SelectOptions />
        </div>
      </div>

      {/* Rest on Separate Rows */}
      {/* <div className="box" ref={refs.predictedGraph}>
        <Sarima />
      </div> */}

      <div className="box" ref={refs.predictedPieChart}>
        <Sarima />
      </div>

      <div className="box" ref={refs.forecast}>
        <PriceForecast />
      </div>

        <div style = {{
          display : 'flex'
        }}>
        <div className="box1" ref={refs.commodities}>
        <Commodities />
        </div>

      <div className="box1">
        <Prices />
      </div>
    </div>

        
      
    </div>

    <div>
      <Footer/>
    </div>
    </div>  );
}
 
export default Home;