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
        { role: 'system', content: 'you are a food expert. User will request a recipe or instructions. Please provide a complete response with the recipe and ingredients in separate properties.' },
        { role: 'user', content: req.body.content }
    ];
  
    try {
      let gptResponse = await gptFetch({ prompt: messages });
      
      // assuming the gptResponse is a string, you might need to do some text parsing to get the separate instructions and ingredients
      let parsedResponse = parseGptResponse(gptResponse);

      console.log("break point 1");
      console.log(parsedResponse.ingredients);

      // Add the assistant's message to the conversation history
      messages.push({ role: 'assistant', content: parsedResponse });
      
      const productNames = ['ham', 'bread', 'cheese'];
      const productData = await fetchProductData(productNames);
      
      // Add the next user's message to the conversation history
      messages.push({ role: 'user', content: `Using the above recipe as well as the following list of products (${productData}), I would like you to return a structured list of products from the list provided we can use to efficiently make this recipe. Only use what is necessary` });
     
      gptResponse = await gptFetch({ prompt: messages });
      res.send(gptResponse);
    } 
    catch (err) {
      console.error(err);
      res.status(500).send(`Error occurred while fetching from GPT-3: ${err.message}`);
    }
});

// Parse GPT-3 response to get the separate instructions and ingredients
function parseGptResponse(response) {
  // Replace this with actual logic for parsing the response
  let recipeInstructions = '';
  let ingredients = [];

  // Assuming the gptResponse is a string with a specific format, we can split it into instructions and ingredients
  // You may need to modify this to fit your actual GPT-3 response format
  if (typeof response === 'string') {
    let parts = response.split('Ingredients: ');
    if (parts.length === 2) {
      recipeInstructions = parts[0].trim();
      ingredients = parts[1].split(',').map(ingredient => ingredient.trim());
    }
  }

  return { recipeInstructions, ingredients };
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
