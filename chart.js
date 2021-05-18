// This is the library that is allowing me to create a canvas in memory. This is important
// because normally you can only work with ChartJS on the front-end.
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

// This is the method that creates the graph. As you can see at the bottom of the page, I'm
// putting this in the export module that I then import in the index.js file.
function MakeGraph(response, widthParameter, heightParameter, configuration) {
    // These are not necessary.
    const width = widthParameter;
    const height = heightParameter;

    // Creating a ChartJS Node Canvas with the passed width and height.
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
    // Variable to hold the chart object.
    var image;
    // To get the return object you have to work in async methods.
    (async() => {
        // Create the chart in memory by passing in the configuration.
        image = await chartJSNodeCanvas.renderToDataURL(configuration);
        // Create a JSON response object.
        var output = { dataUrl: image };
        // Return the output by telling the response it is json.
        response.json(output);

        /* These are some other ways that we could return the graph. */

        // image = await chartJSNodeCanvas.renderToBuffer(configuration);
        // const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
        // const stream = chartJSNodeCanvas.renderToStream(configuration);
    })();
}

module.exports = { MakeGraph }