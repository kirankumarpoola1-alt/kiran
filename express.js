const express = require('express');
const app = express();

app.get('/satya', (req, res) => {
    res.send('Hello from Satya!');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/satya');
});
