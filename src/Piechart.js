import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = () => {
  const [dates, setDates] = useState([]);
  const [priceTypes, setPriceTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPriceType, setSelectedPriceType] = useState("");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/pie_chart/get_options")
      .then((res) => res.json())
      .then((data) => {
        setDates(data.dates);
        setPriceTypes(data.price_types);
      })
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  const fetchPieData = () => {
    if (!selectedDate || !selectedPriceType) {
      alert("Please select both date and price type.");
      return;
    }

    fetch(`http://localhost:5000/pie_chart/get_pie_data?date=${selectedDate}&price_type=${selectedPriceType}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setChartData({
            labels: data.items,
            datasets: [
              {
                data: data.prices,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
              },
            ],
          });
        }
      })
      .catch((error) => console.error("Error fetching pie data:", error));
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333", marginBottom: "15px" }}>Pie Chart</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
        <select
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", outline: "none" }}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">--Select Date--</option>
          {dates.map((date, index) => (
            <option key={index} value={date.date}>{date.date}</option>
          ))}
        </select>

        <select
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", outline: "none" }}
          onChange={(e) => setSelectedPriceType(e.target.value)}
        >
          <option value="">--Select Price Type--</option>
          {priceTypes.map((type, index) => (
            <option key={index} value={type.type}>{type.type}</option>
          ))}
        </select>
      </div>

      <button
        onClick={fetchPieData}
        style={{
          padding: "10px 15px",
          backgroundColor: "#007BFF", // Blue color
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "14px",
          cursor: "pointer",
          transition: "0.3s",
          marginBottom: "20px",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")} // Darker blue on hover
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
      >
        Generate Pie Chart
      </button>

      {chartData && (
        <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "10px" }}>
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
};

export default PieChartComponent;
