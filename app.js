const fs = require('fs');
const unitData = JSON.parse(fs.readFileSync('unitData.json'));

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
      info: "Unit not found. Please try again later."
    });

    return;
  }

  console.log('Unit found.');

  res.send(unitData[req.params.unitNumber]);
});

app.listen(2244, () => {
  console.log('Running on http://localhost:2244/');
});