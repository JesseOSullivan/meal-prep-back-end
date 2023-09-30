const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());  // Enable CORS for all routes

app.use(express.json()); 

// Endpoint to get a response from GPT-3.
app.post('/get-gpt-response', async (req, res) => {
    try {
        const apiKey = process.env.AI_KEY;
        const prompt = req.body.prompt;
        
        const endpoint = 'https://api.openai.com/v1/chat/completions';
        const response = await axios.post(
            endpoint,
            {
                model: 'gpt-4-32k-0314',
                messages: [{ role: 'user', content: prompt }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey,
                },
            }
        );

        const gptResponse = response.data.choices[0].message.content;
        res.json({ response: gptResponse });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
