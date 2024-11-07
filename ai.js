require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']
});

async function generateSAQ(unitNumber) {
  console.log('Starting SAQ request...');

  const completion = await getResponse(
    `Can you give me a 3-part SAQ based on Unit ${unitNumber} of the AP US History CED? Please only give me the SAQ, and no introduction or sample responses.`
  )

  console.log('SAQ generated.');

  return completion;
}

async function getResponse(content) {
  console.log('Starting GPT request...');

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {"role": "user", "content": content}
    ]
  });

  console.log('Response generated.');

  return completion;
}

module.exports = {
  generateSAQ
}