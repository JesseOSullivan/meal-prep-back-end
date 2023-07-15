const axios = require('axios');

exports.gptFetch = async ({ prompt }) => {
    const apiKey = process.env.AI_KEY // Replace with your API key

    const endpoint = 'https://api.openai.com/v1/chat/completions'
    
    try {
    
            const response = await axios.post(
              endpoint,
              {
                model: 'gpt-3.5-turbo',
                messages: prompt
        
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + apiKey,
                },
              }
            );
        
            console.log('GPT-3 response:', response.data.choices[0].message.content);
            return response.data.choices[0].message.content
        
          } catch (error) {
            console.error(error);
          }
        };




