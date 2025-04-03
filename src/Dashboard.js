import React, { useState, useEffect } from "react";

function Prices() {
  const [priceTypes, setPriceTypes] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [state, setState] = useState("");
  const [date, setDate] = useState("");
  const [predictedPrices, setPredictedPrices] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/select/select-options")
      .then((response) => response.json())
      .then((data) => {
        setPriceTypes(data.price_types);
        setAvailableDates(data.available_dates);

        if (data.price_types.length > 0) setState(data.price_types[0]);
        if (data.available_dates.length > 0) setDate(data.available_dates[0]);
      })
      .catch((error) => setError(error.message));
  }, []);

  const fetchPrices = () => {
    if (state && date) {
      fetch(
        `http://localhost:5000/select/predicted-prices-first-6-crops?state=${state}&date=${date}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPredictedPrices(data);
          setError("");
        })
        .catch((error) => setError(error.message));
    }
  };

  const cropIcons = {
    "Atta (Wheat)": "🍞",
    "Gram Dal": "🌰",
    "Rice": "🍚",
    "Tur/Arhar Dal": "🥜",
    "Urad Dal": "🌾",
    "Wheat": "🌾",
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Predicted Prices for the First 6 Crops</h1>

      <div style={styles.selectContainer}>
        <div>
          <label htmlFor="state" style={styles.label}>Select State:</label>
          <select id="state" value={state} onChange={(e) => setState(e.target.value)} style={styles.select}>
            {priceTypes.map((priceType, index) => (
              <option key={index} value={priceType}>{priceType}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" style={styles.label}>Select Date:</label>
          <select id="date" value={date} onChange={(e) => setDate(e.target.value)} style={styles.select}>
            {availableDates.map((dateOption, index) => (
              <option key={index} value={dateOption}>{dateOption}</option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={fetchPrices} style={styles.button}>Fetch Prices</button>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.resultBox}>
        <h3>Predicted Prices:</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Crop</th>
              <th style={styles.th}>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(predictedPrices).map((crop, index) => (
              <tr key={index} style={styles.tr}>
                <td style={styles.td}>
                  <span style={styles.icon}>{cropIcons[crop] || "🌱"}</span> {crop}
                </td>
                <td style={styles.td}>₹{parseFloat(predictedPrices[crop]).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "50%",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#333",
  },
  selectContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  select: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
  },
  resultBox: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "15px",
    textAlign: "left",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
  },
  icon: {
    fontSize: "22px",
    marginRight: "10px",
  },
};

export default Prices;
