const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

app.use(bodyParser.json()); // Parse incoming JSON requests

// Function to find the highest lowercase alphabet
function findHighestLowercase(alphabets) {
  const lowercases = alphabets.filter(char => char.toLowerCase() === char);
  return lowercases.length > 0 ? lowercases.slice(-1)[0] : [];
}

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
  const data = req.body.data || [];
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));

  try {
    const highestLowercase = findHighestLowercase(alphabets);
    res.json({
      is_success: true,
      user_id: "john_doe_17091999", // Replace with your logic to generate user_id
      email: "john@xyz.com", // Replace with your logic to generate email
      roll_number: "ABCD123", // Replace with your logic to generate roll_number
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ is_success: false, error: 'Internal Server Error' });
  }
});

// GET /bfhl endpoint (hardcoded response)
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});