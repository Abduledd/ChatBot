const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: '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'
});

const runPrompt = async () => {
    const prompt = "Hello";

    const response = await openai.completions.create({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 2048,
        temperature: 1,
    });
    console.log(response.choices[0].text);
}

runPrompt();
