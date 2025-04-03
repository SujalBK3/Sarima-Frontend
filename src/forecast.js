import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const ForecastChart = () => {
  const [options, setOptions] = useState({ crops: [], price_types: [] });
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedPriceType, setSelectedPriceType] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch available options on mount
  useEffect(() => {
    fetch("http://localhost:5000/price_forecast/options")
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  // Fetch forecast data when button is clicked
  const fetchForecast = () => {
    if (!selectedCrop || !selectedPriceType) {
      alert("Please select both crop and price type.");
      return;
    }

    setLoading(true);
    fetch("http://localhost:5000/price_forecast/get-forecast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crop: selectedCrop, price_type: selectedPriceType }),
    })
      .then((res) => res.json())
      .then((data) => {
        setForecastData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching forecast:", error);
        setLoading(false);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Commodity Price Forecast</h1>

      <div style={styles.selectContainer}>
        <label style={styles.label}>
          Select Crop:
          <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)} style={styles.select}>
            <option value="">--Select--</option>
            {options.crops.map((crop) => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Select Price Type:
          <select value={selectedPriceType} onChange={(e) => setSelectedPriceType(e.target.value)} style={styles.select}>
            <option value="">--Select--</option>
            {options.price_types.map((price) => (
              <option key={price} value={price}>{price}</option>
            ))}
          </select>
        </label>
      </div>

      <button onClick={fetchForecast} style={styles.button}>Fetch Forecast</button>

      {loading && <p style={styles.loading}>Loading forecast...</p>}
      {!loading && forecastData && <ForecastGraph data={forecastData} />}
    </div>
  );
};

// Graph Component
const ForecastGraph = ({ data }) => {
  const { train, test, predictions, reference_lines } = data;

  const chartData = {
    labels: [...train.map(d => d[0]), ...test.map(d => d[0])],
    datasets: [
      { label: "Train Data", data: train.map(d => d[1]), borderColor: "blue", fill: false },
      { label: "Test Data", data: test.map(d => d[1]), borderColor: "green", fill: false },
      { label: "Predictions", data: [...new Array(train.length).fill(null), ...predictions.map(d => d[1])], borderColor: "red", borderDash: [5, 5], fill: false },
      { label: "MSP", data: new Array(train.length + test.length).fill(reference_lines.msp), borderColor: "orange", borderDash: [10, 10], fill: false },
      { label: "Sell Threshold", data: new Array(train.length + test.length).fill(reference_lines.sell_threshold), borderColor: "purple", borderDash: [5, 15], fill: false },
      { label: "Stockpile Threshold", data: new Array(train.length + test.length).fill(reference_lines.stockpile_threshold), borderColor: "brown", borderDash: [5, 15], fill: false },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensures full width
    scales: {
      y: {
        ticks: {
          callback: (value) => `₹${value}`, // Add Rupee symbol
        },
      },
    },
  };

  return (
    <div style={styles.chartContainer}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

// Styles
const styles = {
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  selectContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  label: {
    fontWeight: "bold",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "200px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  loading: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  chartContainer: {
    width: "100%",
    height: "500px", // Ensures proper size
  },
};

export default ForecastChart;
