const express = require('express');
const { gptFetch } = require('./gpt');

const app = express();

// Enable JSON body parsing
app.use(express.json());

app.post('/', async (req, res) => {
  const messages = [
    { role: 'system', content: 'you are a food recipe expert. user will request how to make a dish or ask you to suggest one and you will provide a list' },
    { role: 'user', content: req.body.content },
  ];
      
  try {
    const gptResponse = await gptFetch({ prompt: messages });
    res.send(gptResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred while fetching from GPT-3');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
