import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://your-deployed-api-url/bfhl'; // Replace with your API URL

function App() {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "21BCY10200";
  }, []);

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post(API_URL, JSON.parse(inputData));
      setResponseData(response.data);
      const filteredData = filterResponseData(response.data, selectedOptions); // Call filtering function
      setResponseData(filteredData);
    } catch (error) {
      console.error(error);
      setError('Error processing request');
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const filterResponseData = (data, options) => {
    const filtered = {};
    if (options.includes('numbers')) {
      filtered.numbers = data.numbers;
    }
    if (options.includes('alphabets')) {
      filtered.alphabets = data.alphabets;
    }
    if (options.includes('highest_lowercase_alphabet')) {
      filtered.highest_lowercase_alphabet = data.highest_lowercase_alphabet;
    }
    return filtered;
  };

  return (
    <div>
      <h1>REST API Frontend</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Enter JSON data:</label>
        <input type="text" value={inputData} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {responseData && (
        <div>
          <h2>Response:</h2>
          <ul>
            {selectedOptions.map(option => (
              <li key={option}>
                {option}: {JSON.stringify(responseData[option])}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2>Select options to display:</h2>
        <input type="checkbox" id="numbers" value="numbers" checked={selectedOptions.includes('numbers')} onChange={handleOptionChange} />
        <label htmlFor="numbers">Numbers</label>
        <input type="checkbox" id="alphabets" value="alphabets" checked={selectedOptions.includes('alphabets')} onChange={handleOptionChange} />
        <label htmlFor="alphabets">Alphabets</label>
        <input type="checkbox" id="highest_lowercase_alphabet" value="highest_lowercase_alphabet" checked={selectedOptions.includes('highest_lowercase_alphabet')} onChange={handleOptionChange} />
        <label htmlFor="highest_lowercase_alphabet">Highest Lowercase Alphabet</label>
      </div>
    </div>
  );
}

export default App;