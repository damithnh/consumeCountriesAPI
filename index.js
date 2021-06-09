const express = require('express');
const app = express();
app.use(express.json());

const currency = require('./routes/currency');
app.use('/api/currencies', currency);

const time = require('./routes/time');
app.use('/api/timedifference', time);

const region = require('./routes/region');
app.use('/api/region', region);

// const test = require('./routes/test1');
// app.use('/api/test', test);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));