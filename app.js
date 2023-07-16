const express = require('express');
const { gptFetch } = require('./gpt');
const app = express();
const { fetchProductData } = require('./productModel');


// Enable JSON body parsing
app.use(express.json());
app.use((req, res, next) => {

res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
next();
});

app.post('/recipe', async (req, res) => {
    const messages = [
      { role: 'system', content: 'you are a food expert. User will ask for a recipe or how to make something then you will provide 2 arrays. array of the ingredients needed and a string that is the recipe instructions"'},
      { role: 'user', content: req.body.content }
    ];
  
    try {
      let gptResponse = await gptFetch({ prompt: messages });
      console.log("breka point 1 ")


      // Add the assistant's message to the conversation history
      messages.push({ role: 'assistant', content: gptResponse });
      
      const productNames = ['ham',  'bread', 'cheese'];

      const productData = await fetchProductData(productNames);
      // Add the next user's message to the conversation history
      messages.push({ role: 'user', content: `Using the above recipe as well as the following list of products (${productData}), I would like you to return a structured list of products from the list provided we can use to efficiently make this recipe. Only use what is necesary` });
     
      gptResponse = await gptFetch({ prompt: messages });
  
      res.send(gptResponse);
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
