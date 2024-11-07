require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

async function getResponse(content) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {"role": "user", "content": content}
    ]
  });

  return completion;
}

async function test() {
  console.log(await getResponse('write me a haiku about ai'));
}

// test();