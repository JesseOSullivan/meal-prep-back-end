const express = require('express');
const {gptFetch} = require('./gpt')
// Create an instance of Express
const app = express();

// Define a route for the root URL
app.post('/', async (req, res) => {
    const messages = [
        { role: 'system', content: 'you are afood recipe expert. user will request how to make a dish or ask you to sugget one and you will proived a list' },
        { role: 'user', content:req },
      ];
        
    try {
      const gptResponse = await gptFetch({prompt: messages});
      res.send("gptResponse");
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
