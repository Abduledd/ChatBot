const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');

const OPENAI_API_KEY = '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';


const app = express();

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));


async function generateResponse(prompt) {
    const response = await openai.completions.create({
        model: 'text-davinci-002',
        prompt: prompt,
        max_tokens: 1024,
        temperature: 1,
    });
    const message = response.choices[0].text;
    return message;
}

app.post('/api/sendMessage', async (req, res) => {
    const userInput = req.body.message;
    try {
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
