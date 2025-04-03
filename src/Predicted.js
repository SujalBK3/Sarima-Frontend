import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components in ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = () => {
  const [priceTypes, setPriceTypes] = useState([]);
  const [cropTypes, setCropTypes] = useState([]);
  const [selectedPriceType, setSelectedPriceType] = useState('');
  const [selectedCropType, setSelectedCropType] = useState('');
  const [pieChartData, setPieChartData] = useState(null);

  // Fetch the options for price types and crop types from the Flask backend
  useEffect(() => {
    fetch('http://localhost:5000/plot/select-options') // Update the URL based on your Flask app's URL
      .then((response) => response.json())
      .then((data) => {
        if (data.price_types && data.crop_types) {
          setPriceTypes(data.price_types);
          setCropTypes(data.crop_types);
        }
      })
      .catch((error) => console.error('Error fetching select options:', error));
  }, []);

  // Fetch the predicted pie chart data based on selected price type and crop type
  const fetchPredictedPieChart = () => {
    if (selectedPriceType && selectedCropType) {
      // Adjust the URL to point to your Flask endpoint for predicted data
      fetch(`http://localhost:5000/plot/predicted-piechart?crop=${selectedCropType}&state=${selectedPriceType}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.labels && data.values) {
            // Prepare the chart data
            const chartData = {
              labels: data.labels,
              datasets: [
                {
                  data: data.values,
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                  hoverOffset: 4,
                },
              ],
            };
            setPieChartData(chartData);
          }
        })
        .catch((error) => console.error('Error fetching predicted pie chart data:', error));
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Predict Pie Chart Based on Crop and Price Type</h1>

      {/* Dropdown for Price Type (States) */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Select Price Type (State): </label>
        <select
          value={selectedPriceType}
          onChange={(e) => setSelectedPriceType(e.target.value)}
          style={{ padding: '8px', marginRight: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="">Select Price Type</option>
          {priceTypes.map((price, index) => (
            <option key={index} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown for Crop Type */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Select Crop Type: </label>
        <select
          value={selectedCropType}
          onChange={(e) => setSelectedCropType(e.target.value)}
          style={{ padding: '8px', marginRight: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="">Select Crop Type</option>
          {cropTypes.map((crop, index) => (
            <option key={index} value={crop}>
              {crop}
            </option>
          ))}
        </select>
      </div>

      {/* Button to fetch the predicted pie chart data */}
      <div>
        <button
          onClick={fetchPredictedPieChart}
          disabled={!selectedPriceType || !selectedCropType}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#007BFF', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            fontSize: '16px', 
            transition: 'background 0.3s ease' 
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}
        >
          Generate Pie Chart
        </button>
      </div>

      {/* Display Pie Chart if data is available */}
      {pieChartData && (
        <div>
          <h2>Predicted Pie Chart for {selectedCropType} - {selectedPriceType}</h2>
          <Pie data={pieChartData} />
        </div>
      )}
    </div>
  );
};

export default PieChartComponent;