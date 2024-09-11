const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY1,
});

const GetGPTReponse = async (roleRequest, contentRequest) => {
    console.log(openai.apiKey);
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: roleRequest, content: contentRequest }],
        temperature: 1,
        max_tokens: 16381,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: {
            "type": "text"
        },
    });
    return response;
}

module.exports = GetGPTReponse;
