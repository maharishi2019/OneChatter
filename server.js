const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const { ppid } = require('process');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.static(path.join(__dirname, "public")))