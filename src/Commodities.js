import React, { useState, useEffect } from 'react';

function Commodities() {
  const [options, setOptions] = useState({ dates: [], prices: [] });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [cropPrices, setCropPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch options (dates and price types) on component mount
  useEffect(() => {
    fetch("http://localhost:5000/commodities/get_options")
      .then((response) => response.json())
      .then((data) => {
        setOptions({
          dates: data.dates,
          prices: data.prices,
        });
      })
      .catch((error) => setError("Error fetching options: " + error.message));
  }, []);

  // Handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Handle price type change
  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  // Fetch commodity data based on selected date and price type
  const fetchCommodityData = () => {
    if (selectedDate && selectedPrice) {
      setLoading(true);
      fetch(`http://localhost:5000/commodities/get_data?date=${selectedDate}&price=${selectedPrice}`)
        .then((response) => response.json())
        .then((data) => {
          setCropPrices(data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching commodity data: " + error.message);
          setLoading(false);
        });
    }
  };

  const cropIcons = {
    "Atta (Wheat)": "🍞",
    "Gram Dal": "🌰",
    "Rice": "🍚",
    "Tur/Arhar Dal": "🥜",
    "Urad Dal": "🌾",
    "Wheat": "🌾"
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Commodity Prices</h1>

      <div style={styles.selectContainer}>
        <div>
          <label style={styles.label}>Select Date:</label>
          <select onChange={handleDateChange} value={selectedDate} style={styles.select}>
            <option value="">Select Date</option>
            {options.dates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={styles.label}>Select Price Type:</label>
          <select onChange={handlePriceChange} value={selectedPrice} style={styles.select}>
            <option value="">Select Price Type</option>
            {options.prices.map((price, index) => (
              <option key={index} value={price}>{price}</option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={fetchCommodityData} style={styles.button}>Fetch Prices</button>

      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && cropPrices.length > 0 && (
        <div style={styles.resultBox}>
          <h2>Commodity Prices for {selectedDate} and {selectedPrice}:</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Commodity</th>
                <th style={styles.tableHeader}>Prices</th>
              </tr>
            </thead>
            <tbody>
              {cropPrices.map((commodity, index) => {
                const commodityName = Object.keys(commodity)[0];
                return (
                  <tr key={index} style={styles.tableRow}>
                    <td>{cropIcons[commodityName] || "🌱"} {commodityName}</td>
                    <td>{commodity[commodityName].map(price => `₹${price}`).join(", ")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {cropPrices.length === 0 && !loading && selectedDate && selectedPrice && (
        <p>No data available for the selected date and price type.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "60%",
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
  },
  tableHeader: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  loading: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default Commodities;
