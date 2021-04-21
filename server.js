// Dependencies
const express = require('express');

// Express Config.
const app = express();

// Allows express to serve static files (CSS, HTML, JS)
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/apiRoutes')(app);
require('/routes/htmlRoutes')(app);

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})