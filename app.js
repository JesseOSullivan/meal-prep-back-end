const express = require('express');
const { gptFetch } = require('./gpt');
const app = express();
const { fetchProductData } = require('./productModel');

// Enable JSON body parsing
app.use(express.json());

app.post('/recipe', async (req, res) => {
    const messages = [
      { role: 'system', content: 'you are a food recipe expert. user will request how to make a dish or ask you to suggest one then list the ingredients and the dish"'},
      { role: 'user', content: req.body.content }
    ];
  
    try {
      let gptResponse = await gptFetch({ prompt: messages });
  
      // Add the assistant's message to the conversation history
      messages.push({ role: 'assistant', content: gptResponse.choices[0].text });
      
      const productNames = ['ham',  'bread', 'cheese'];

      const productData = await fetchProductData(productNames);
  
      // Add the next user's message to the conversation history
      messages.push({ role: 'user', content: `Using the above recipe as well as the following list of products (${productData}), I would like you to return a structured list of products from the list provided we can use to efficiently make this recipe. Only use what is necesary` });
  
      gptResponse = await gptFetch({ prompt: messages });
  
      res.send(gptResponse.choices[0].text);
    } 
    catch (err) {
      console.error(err);
      res.status(500).send(`Error occurred while fetching from GPT-3: ${err.message}`);
    }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
