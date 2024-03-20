const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Inventory Application');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
