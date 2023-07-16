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
        { role: 'system', content: 'you are a food expert. User will request a recipe or instructions. Please provide a complete response as json with these properties. ingredients in an array (name and ammount only) instructions and ingredientNoAmt for only the name of ingredient.' },
        { role: 'user', content: req.body.content }
    ];
  
    try {
      let gptResponse = await gptFetch({ prompt: messages });
      console.log("json data ");
      var data = JSON.parse(gptResponse);
      var recipe = data.recipe;
      var ingredients = data.ingredients;
      
      console.log(data)


      // Add the assistant's message to the conversation history
      messages.push({ role: 'assistant', content: gptResponse });
      
      const productNames = data.ingredients;

      const productData = await fetchProductData(productNames);
      // Add the next user's message to the conversation history
      
      let jsonString = JSON.stringify(productData);

      messages.push({ role: 'user', content: `Using the above recipe as well as the following list of products (${jsonString}), I would like you to return a structured list of products from the list provided we can use to efficiently make this recipe. Only use what is necesary return it as an array whith each array including the product name, amt and link use the links are from the object above  ` });

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
