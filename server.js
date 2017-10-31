const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const indexRoutes = require('./routes/api');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/interclub-challenge', { useMongoClient: true });

app.use(cors());

app.use('/api', indexRoutes);

app.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

const PORT = 4000;
app.listen(PORT, function () {
    console.log(`Server listening on Port ${PORT}`);
});
