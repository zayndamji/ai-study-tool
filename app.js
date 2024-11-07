const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(2244, () => {
  console.log('Running on http://localhost:2244/');
});