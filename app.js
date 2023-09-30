const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());  // Enable CORS for alssl routes
app.use(express.json());

app.post('/api/openai', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo-16k-0613',
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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' // Replace with your OpenAI key
                }
            }
        );

        res.json(response.data.choices[0].message.content);
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Error calling OpenAI API');
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
