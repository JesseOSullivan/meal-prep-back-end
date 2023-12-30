require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

// Load SSL key and certificate
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Endpoint to get a response from GPT-3.
app.post('/get-gpt-response', async (req, res) => {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        const prompt = req.body.prompt;
        
        const endpoint = 'https://api.openai.com/v1/chat/completions';
        const response = await axios.post(
            endpoint,
            {
                model: 'gpt-4-0314',
                messages: [{ role: 'user', content: prompt }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
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

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

const PORT = process.env.PORT || 3000;
// Create HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS server running on port ${PORT}`);
});
