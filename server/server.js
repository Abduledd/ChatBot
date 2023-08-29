const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = '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';
openai.api_key = OPENAI_API_KEY;

app.post('/api/sendMessage', async (req, res) => {
    const userInput = req.body.message;

    try {
        const completions = await openai.Completion.create({
            engine: 'text-davinci-002',
            prompt: userInput,
            max_tokens: 1024,
            n: 1,
            stop: null,
            temperature: 0.5,
        });

        const botReply = completions.choices[0].text;
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
