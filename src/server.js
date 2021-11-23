const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('../public/index.html');
})

app.listen(8080, () => {
    console.log("--server online--");
})