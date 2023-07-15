const express = require('express');
const { gptFetch } = require('./gpt');

const app = express();

// Enable JSON body parsing
app.use(express.json());

app.post('/', async (req, res) => {
    const messages = [
      { role: 'system', content: 'you are a food recipe expert. user will request how to make a dish or ask you to suggest one and the response will be a json object the list of ingedients needed under recipe and the instructions under instructions' },
      { role: 'user', content: req.body.content },
    ];
        
    try {
      const gptResponse = await gptFetch({ prompt: messages });
      // Split the text by the first newline character
      const [recipe, ...instructionsArr] = gptResponse.split('\n');
      // Join the remaining parts back together for the instructions
      const instructions = instructionsArr.join('\n');
      // Send back a JSON object with the parsed recipe and instructions
      res.json({ recipe, instructions });
    } 
    catch (err) {
      console.error(err);
      res.status(500).send('Error occurred while fetching from GPT-3');
    }
  });
  
//messages.push({role: 'user', content:req})

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
