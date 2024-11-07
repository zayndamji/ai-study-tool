require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {"role": "user", "content": "write a haiku about ai"}
    ]
  });
  
  console.log(completion.choices[0].message);
} main();