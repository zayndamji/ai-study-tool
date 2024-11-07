require('dotenv').config();
const fs = require('fs');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']
});

const showdown = require('showdown');
const converter = new showdown.Converter();

async function generateSAQ(unitNumber, timePeriod) {
  console.log('Starting SAQ request...');

  const completion = await getResponse(
`Can you give me a 3-part SAQ within the time period ${timePeriod} and based on the topics listed in unit ${unitNumber} of the AP US History Course and Exam Description?
Only give the SAQ; do not give any introduction or sample responses.

The question should be formatted similar to either of these model SAQs:
Respond to parts a, b, and c.
a. Briefly describe one British government policy enacted in colonial North America from 1763 to
1776.
b. Briefly explain one similarity OR difference in how TWO groups in North America responded to a
British policy from 1763 to 1783.
c. Briefly explain how one specific historical development contributed to the American colonists’
victory over Great Britain from 1775 to 1783.

Respond to parts a, b, and c.
a. Briefly describe one United States Cold War policy from 1945 to 1991.
b. Briefly explain one similarity OR difference in how TWO groups in the United States responded to a
Cold War policy from 1945 to 1991.
c. Briefly explain how one specific historical development after 1980 contributed to the end of the Cold
War.

Respond to parts a, b, and c.
a. Briefly describe one United States government policy from 1783 to 1840.
b. Briefly explain one similarity OR difference in how two groups responded to political change in the
United States from 1783 to 1840.
c. Briefly explain how one historical development from 1840 to 1860 contributed to regional divisions.

Respond to parts a, b, and c.
a. Briefly describe one economic development from 1865 to 1900.
b. Briefly explain one similarity OR difference in how two groups responded to economic change from
1865 to 1900.
c. Briefly explain how one historical development from 1900 to 1940 contributed to government
involvement in the economy.`);

  console.log('SAQ generated.');

  const messageContent = completion.choices[0].message.content;

  storeSAQ(messageContent, unitNumber);

  const htmlMessageContent = '<p><strong>SAQ:</strong></p>' + converter.makeHtml(messageContent);

  return htmlMessageContent;
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

async function storeSAQ(saq, unitNumber) {
  const saqs = JSON.parse(fs.readFileSync('saqs.json'));
  saqs[unitNumber].push(saq.trim());
  fs.writeFileSync('saqs.json', JSON.stringify(saqs, undefined, 2));
}

module.exports = {
  generateSAQ
}