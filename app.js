const express = require('express');
const { gptFetch } = require('./gpt');

const app = express();

// Enable JSON body parsing
app.use(express.json());

app.post('/', async (req, res) => {
    const messages = [
      { role: 'system', content: 'you are a food recipe expert. user will request how to make a dish or ask you to suggest one and list ingredients needed under recipe and the instructions under instructions' },
      { role: 'user', content: req.body.content },
    ];
        
    try {
      let gptResponse = await gptFetch({ prompt: messages });
  
      // Add the assistant's message to the conversation history
      messages.push({ role: 'assistant', content: gptResponse });
  
      // Add the next user's message to the conversation history
      messages.push({ role: 'user', content: "Using the below recipe as well as the below list of products from Woolworths, I would like you to return a structured list of products we can use to efficiently make this recipe" });
          
      // Make another call to gptFetch with the updated conversation history
      gptResponse = await gptFetch({ prompt: messages });
  
      res.send(gptResponse);
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
