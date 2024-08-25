const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Function to find the highest lowercase alphabet
function findHighestLowercase(alphabets) {
  const lowercases = alphabets.filter(char => char.toLowerCase() === char);
  return lowercases.length > 0 ? lowercases.slice(-1)[0] : [];
}

// POST /bfhl endpoint
app.post('/bfhl', async (req, res) => {
  const data = req.body.data || [];
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));

  try {
    const highestLowercase = findHighestLowercase(alphabets);

    // Replace with your logic to generate user_id, email, and roll_number
    const user_id = "john_doe_17091999";
    const email = "john@xyz.com";
    const roll_number = "ABCD123";

    res.json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ is_success: false, error: 'Internal Server Error' });
  }
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});