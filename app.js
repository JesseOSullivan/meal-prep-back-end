const express = require('express');
const {gptFetch} = require('./gpt')
// Create an instance of Express
const app = express();
const messages = [
    { role: 'system', content: 'you are afood recipe expert.' },
    { role: 'user', content: 'hwo to make tacos' },
  ];

// Define a route for the root URL
app.get('/', async (req, res) => {
    try {
      const gptResponse = await gptFetch({prompt: messages});
      res.send(gptResponse);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error occurred while fetching from GPT-3');
    }
  });
  
// Start the server
const port = 3000; // You can change this to any port number you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
