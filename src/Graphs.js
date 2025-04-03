import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graphs = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [crops, setCrops] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/graphs/get_options")
      .then((response) => response.json())
      .then((data) => {
        setCrops(data.crops);
        setPrices(data.prices);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("Failed to fetch options.");
      });
  }, []);

  const fetchData = () => {
    fetch(`http://127.0.0.1:5000/graphs/get_data?crop_index=${selectedCrop}&price_index=${selectedPrice}`)
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid data format received from server");

        const labels = data.map((entry) => entry.Date);
        const prices = data.map((entry) => entry.Price);

        setChartData({
          labels,
          datasets: [
            {
              label: "Crop Price",
              data: prices,
              borderColor: "#007BFF", // Changed to blue
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              borderWidth: 2,
              pointRadius: 3,
            },
          ],
        });
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("Failed to fetch data.");
      });
  };

  useEffect(() => {
    if (crops.length > 0 && prices.length > 0) {
      fetchData();
    }
  }, [selectedCrop, selectedPrice, crops, prices]);

  if (error) return <div style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>{error}</div>;
  if (!chartData) return <div style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>Loading...</div>;

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "15px",
        }}
      >
        Crop Price Trend
      </h2>

      {/* Dropdowns & Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <label style={{ fontWeight: "bold", color: "#555" }}>Select Crop:</label>
        <select
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
          }}
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
        >
          {crops.map((crop, index) => (
            <option key={index} value={index}>
              {crop}
            </option>
          ))}
        </select>

        <label style={{ fontWeight: "bold", color: "#555" }}>Select Price Type:</label>
        <select
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
          }}
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          {prices.map((price, index) => (
            <option key={index} value={index}>
              {price}
            </option>
          ))}
        </select>

        <button
          onClick={fetchData}
          style={{
            padding: "8px 15px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Update Graph
        </button>
      </div>

      {/* Graph Container */}
      <div
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Graphs;
