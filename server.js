// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
// const db = ('./db/db')

// Express Config.
const app = express();
const PORT = process.env.PORT || 8080;

const rawData = fs.readFileSync('./db/db.json');
const db = JSON.parse(rawData);

// MAYBE GET FOR SPECIFIC NOTE SHOWING
app.use(express.json());
app.use(express.static('public'));

 const addNewJSON = (item, res) => {
    let tempArray = db;
    let output = {};
    output.id = Date.now();
    output.title = item.title;
    output.text = item.text; 
    tempArray.push(output);
    tempArray = JSON.stringify(tempArray);
    res.json(fs.writeFile('./db/db.json', tempArray, (err) => {console.log(err)}))
};

const deleteJSONNote = (id, res) => {
    let tempArray = db;
    for (i = 0; i < tempArray.length; i++){
        if (tempArray[i].id == id){
            tempArray.splice(i, 1)
        }
    }
    tempArray = JSON.stringify(tempArray);
    res.json(fs.writeFile('./db/db.json', tempArray, (err) => console.log(err)))
}

// Allows express to serve static files (CSS, HTML, JS)
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => addNewJSON(req.body, res));

app.delete('/api/notes/:id', (req, res) => deleteJSONNote(req.params.id, res))

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})

console.log(db);

