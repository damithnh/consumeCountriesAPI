const genres = require('./routes/countries');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/countries', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));