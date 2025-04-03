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
import Footer from './footer';
import Home from "./HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profiles from "./profiles";

function App() {
  // Create references for each section
  
  return (
    <Router>
      <div>
        <Routes>
      <Route path = "/" element={<Home/>}/>

    
      <Route path = "profiles" element={<Profiles/>}></Route>
    </Routes>
    </div>
   
    </Router>
    


  );
}



export default App;
