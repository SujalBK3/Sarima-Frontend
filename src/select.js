import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components in ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const SelectOptions = () => {
  const [priceTypes, setPriceTypes] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [pieData, setPieData] = useState(null);

  // Fetch available price types and dates from the /select-options endpoint when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/select/select-options')
      .then(response => response.json())
      .then(data => {
        setPriceTypes(data.price_types);
        setAvailableDates(data.available_dates);
      })
      .catch(error => console.error('Error fetching select options:', error));
  }, []);

  // Handle the change in price type (state)
  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  // Handle the change in date
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Fetch the predicted pie chart data when a user selects a date and price type
  const handleSubmit = () => {
    fetch(`http://localhost:5000/select/predicted-piechart?state=${selectedPrice}&date=${selectedDate}`)
      .then(response => response.json())
      .then(data => {
        const chartData = {
          labels: data.labels,
          datasets: [
            {
              label: 'Predicted Prices',
              data: data.values,
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF1493', '#8A2BE2'
              ],
            },
          ],
        };
        setPieData(chartData);
      })
      .catch(error => console.error('Error fetching pie chart data:', error));
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ color: '#333' }}>Predict Crop Prices</h1>
      
      {/* Dropdown for selecting date */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Select Date (From July 1st to September 30th, 2018): </label>
        <select 
          value={selectedDate} 
          onChange={handleDateChange} 
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="">Select a Date</option>
          {availableDates.map((date) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
      </div>

      {/* Dropdown for selecting price type (state) */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Select Price Type (State): </label>
        <select 
          value={selectedPrice} 
          onChange={handlePriceChange} 
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="">Select Price Type</option>
          {priceTypes.map((price) => (
            <option key={price} value={price}>{price}</option>
          ))}
        </select>
      </div>

      {/* Button to fetch the predicted pie chart data */}
      <div>
        <button 
          onClick={handleSubmit} 
          style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '10px 15px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            fontSize: '16px' 
          }}
        >
          Get Predicted Prices
        </button>
      </div>

      {/* Pie chart */}
      {pieData && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ color: '#555' }}>Predicted Crop Prices for {selectedPrice} on {selectedDate}</h2>
          <Pie data={pieData} />
        </div>
      )}
    </div>
  );
};

export default SelectOptions;
