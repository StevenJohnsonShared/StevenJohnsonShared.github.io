// Importing the chart Javascript file so that I can call the 
// method that creates and returns the graph.
const chart = require('./chart.js');

// This library helps me create a path string without having
// to know the exact location.
const path = require('path');

// This is the NodeJS framework I'm using to build the back end.
// It is pretty basic if you haven't worked with it before.
const express = require('express');
// This is a library that allows me to parse the body of a HTTP
// post request as a json.
const bodyParser = require('body-parser');

// Initialize the backend app.
const app = express();
// Initialize the JSON parser.
const jsonParser = bodyParser.json();

// Static variable for testing.
const port = 3000;

// This returns the main page. This is not necessary. You can leave
// this off and if someone where to go to the base url it would just return
// a 404.
app.use('/', express.static(path.join(__dirname, 'Public')));

// This is the graph API endpoint.
app.post('/Graph', jsonParser, function(request, response) {
    // Testing to see what the body of the request body looked like.
    console.log("\n\n");
    console.log(request.body);

    // I don't know if this is best practice but the issue I was running into was
    // that when I tried to just return the graph, it would destroy itself because it
    // was leaving the reference of the function. Not sure why but that was what the
    // library did when I stepped through it. Therefore I passed the responce object
    // to the method and it will respond to the request from there.
    chart.MakeGraph(response, request.body.width, request.body.height, request.body.graphConfig);
});

// This is just a test page I'm using to visualize what the graph looks like. The 
// /Graph endpoint just returns the png or dataurl.
app.get('/TestPage', function(request, response) {
    response.sendFile(path.join(__dirname + '/Public/TestPage.html'));
})

// Launching the app listening to the port defined at the top. The console will print
// out a message for you to just click.
app.listen(port, () => {
    console.log(`GraphAPI listening at http://localhost:${port}`)
});