const express = require('express');
const { gptFetch } = require('./gpt');
const { faunaFetch } = require('./fauna');
const app = express();

// Enable JSON body parsing
app.use(express.json());

app.post('/', async (req, res) => {
    const messages = [
      { role: 'system', content: 'you are a food recipe expert. user will request how to make a dish or ask you to suggest one then list the ingredients and the dish"'}
    ];
  
    try {
      let gptResponse = await gptFetch({ prompt: messages });
  
      // Add the assistant's message to the conversation history
      messages.push({ role: 'assistant', content: gptResponse });
  
      const productNames = ["cheese 1kg 10$", "ham 100grams", "bread 2$", "cheese slices 10pc, 3$", 'coles butter block'];
  
      /*const products = await faunaFetch({
        query: `
          query GetProductsByNames($names: [String!]!) {
            getProductsByNames(names: $names) {
              data {
                _id
                name
                price
              }
            }
          }
        `,
        variables: { names: productNames },
      });*/
  
      // Convert the list of products into a string
     // const productsString = products.data.getProductsByNames.data.map(product => `${product.name}: ${product.price}`).join(', ');
  
      // Add the next user's message to the conversation history
      messages.push({ role: 'user', content: `Using the above recipe as well as the following list of products from Woolworths (${productNames}), I would like you to return a structured list of products from the list provided we can use to efficiently make this recipe.` });
  
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
