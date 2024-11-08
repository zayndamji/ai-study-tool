const { generateSAQ } = require('./ai');

const fs = require('fs');
const unitData = JSON.parse(fs.readFileSync('unitData.json'));

if (!fs.existsSync('saqs.json')) fs.writeFileSync('saqs.json', '');
if (fs.readFileSync('saqs.json') == '') fs.writeFileSync('saqs.json', '{"1":[],"2":[],"3":[],"4":[],"5":[],"6":[],"7":[],"8":[],"9":[]}');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/styles.css', (req, res) => {
  res.sendFile('styles.css', { root: __dirname });
});

app.get('/script.js', (req, res) => {
  res.sendFile('script.js', { root: __dirname });
});

app.get('/unit/:unitNumber', (req, res) => {
  console.log(req.params);
  if (!req.params.unitNumber) return;

  if (!unitData[req.params.unitNumber]) {
    console.log('Unit not found.');

    res.send({
      info: 'Unit not found. Please try again later.'
    });

    return;
  }

  console.log('Unit found.');

  res.send(unitData[req.params.unitNumber]);
});

app.get('/generate/saq/unit/:unitNumber', async (req, res) => {
  console.log(req.params);
  if (!req.params.unitNumber) return;

  if (!unitData[req.params.unitNumber]) {
    console.log('Unit not found.');

    res.send({
      info: 'Unit not found. Please try again later.'
    });

    return;
  }

  console.log('Unit found.');

  const saq = await generateSAQ(req.params.unitNumber, unitData[req.params.unitNumber].time);

  console.log('SAQ Generated:');
  console.log(saq);

  res.send({
    info: saq
  });
});

app.listen(2244, () => {
  console.log('Running on http://localhost:2244/');
});