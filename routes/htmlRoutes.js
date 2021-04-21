// dependencies
const path = require('path');

// Routing


module.exports = (app) => {
    app.get('/index', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    // if no matching route it directs you to the notes page
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    }); 
};