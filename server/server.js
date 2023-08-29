const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');
const cors = require('cors');
const fetch = require('node-fetch').default;

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',
}));


const OPENAI_API_KEY = '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';
openai.api_key = OPENAI_API_KEY;

async function generateResponse(prompt) {
    const apiKey = OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';

    const requestData = {
        prompt: prompt,
        max_tokens: 1024,
        n: 1,
        stop: null,
        temperature: 0.5
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestData)
    });

    const data = await response.json();
    const message = data.choices[0].text;

    return message;
}


app.post('/api/sendMessage', async (req, res) => {
    const userInput = req.body.message;
    try {
        // const completions = await openai.Completion.create({
        //     engine: 'text-davinci-002',
        //     prompt: userInput,
        //     max_tokens: 1024,
        //     n: 1,
        //     stop: null,
        //     temperature: 0.5,
        // });
        // const botReply = "Ok this is the response"

        // const botReply = completions.choices[0].text;
        const botReply = await generateResponse(userInput);
        res.json({ message: botReply });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
