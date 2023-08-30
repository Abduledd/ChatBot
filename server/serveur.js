const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(config);


const runPrompt = async () => {
    const prompt = "Hello";

    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 2048,
        temperature: 1,
    });

    console.log(response.data);
}

runPrompt();