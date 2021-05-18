document.addEventListener('DOMContentLoaded', () => {
    // Hard coded data for the ChartJs configuration. This can be customized by collecting the data and parsing it into a json.
    let configuration = {
        data: {
            datasets: [{
                    type: 'line',
                    // data: [50, 50, 50, 50],
                    data: [18, 20, 10, 15],
                    borderColor: "red",
                    backgroundColor: "red",
                },
                {
                    type: 'bar',
                    data: [30, 40, 50, 20],
                    borderColor: "green",
                    backgroundColor: "green"
                        // data: [1, 2, 3, 4]
                },
            ],
            labels: ['January', 'Febuary', 'March', 'April']
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }

    let pumpPerfConfiguration = {
        data: {
            datasets: [{
                    type: 'bar',
                    data: [
                        [2, 10]
                    ],
                    label: 'Max Min'
                },
                {
                    type: 'line',
                    data: [7],
                    borderColor: 'red',
                    backgroundColor: 'red',
                    label: 'Std. Dev'
                }
            ],
            labels: ['']
        },
        options: {
            indexAxis: 'y',
            legend: {
                display: false,
            },
            scales: {
                x: {
                    offset: true
                }
            }
        }
    }

    // This is what the json that should be passed to the api should look like.
    // let jsonToPass = { width: 250, height: 100, graphConfig: pumpPerfConfiguration }
    let jsonToPass = { width: 1000, height: 1000, graphConfig: configuration }

    // This is what the request would look like.
    fetch('/graph', {
            // The request has to be a post request so that you can pass the chart configuration in the body of the request.
            method: 'POST',
            // normal stuff
            headers: { 'Content-Type': 'application/json' },
            // stringify the configuration
            body: JSON.stringify(jsonToPass)
        })
        // Turn the response into a json object.
        .then(response => response.json())
        // Assign the src attribute with the dataUrl that you recieved.
        .then(returnObject => {
            document.getElementById('returnImage').setAttribute('src', returnObject.dataUrl);
        });
})