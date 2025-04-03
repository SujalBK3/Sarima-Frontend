import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Sarima = () => {
    const [crops, setCrops] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCrop, setSelectedCrop] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/sarima/options")
            .then(response => response.json())
            .then(data => {
                setCrops(data.crops);
                setStates(data.states);
            });
    }, []);

    const fetchPredictions = () => {
        if (!selectedCrop || !selectedState) return;
        
        fetch(`http://localhost:5000/sarima/predict?crop=${selectedCrop}&state=${selectedState}`)
            .then(response => response.json())
            .then(data => {
                const trainData = data.train;
                const testData = data.test;
                const predictions = data.predictions;
                
                const labels = [...trainData.map(d => d[0]), ...testData.map(d => d[0])];
                const trainValues = trainData.map(d => d[1]);
                const testValues = testData.map(d => d[1]);
                const predictedValues = predictions.map(d => d[1]);
                
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Training Data (Jan-June)",
                            data: [...trainValues, ...new Array(testValues.length).fill(null)],
                            borderColor: "blue",
                            borderWidth: 2,
                            fill: false,
                        },
                        {
                            label: "Actual Data (July-Sept)",
                            data: [...new Array(trainValues.length).fill(null), ...testValues],
                            borderColor: "green",
                            borderWidth: 2,
                            fill: false,
                        },
                        {
                            label: "Predicted Data",
                            data: [...new Array(trainValues.length).fill(null), ...predictedValues],
                            borderColor: "red",
                            borderWidth: 2,
                            borderDash: [5, 5],
                            fill: false,
                        },
                    ],
                });
            });
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>SARIMA Interactive Prediction</h2>
            <div style={{ marginBottom: "20px" }}>
                <label style={{ marginRight: "10px" }}>State: </label>
                <select 
                    value={selectedState} 
                    onChange={(e) => setSelectedState(e.target.value)}
                    style={{ padding: "8px", marginRight: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
                >
                    <option value="">Select State</option>
                    {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
                
                <label style={{ marginRight: "10px" }}>Crop: </label>
                <select 
                    value={selectedCrop} 
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    style={{ padding: "8px", marginRight: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
                >
                    <option value="">Select Crop</option>
                    {crops.map(crop => (
                        <option key={crop} value={crop}>{crop}</option>
                    ))}
                </select>
                
                <button 
                    onClick={fetchPredictions} 
                    style={{ 
                        padding: "10px 15px", 
                        backgroundColor: "#007BFF", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "5px", 
                        cursor: "pointer", 
                        fontSize: "16px", 
                        transition: "background 0.3s ease" 
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
                >
                    Predict
                </button>
            </div>
            
            {chartData && <Line data={chartData} />}
        </div>
    );
};

export default Sarima;
