let graph = null;
let animationActive = true; // Zmienna kontrolująca stan animacji
function drawGraph(dataset) {
    return new Chart(document.getElementById("chart").getContext("2d"), {
        type: "line",
        data: {
            datasets: [
                {
                    label: "Electric potential equation",
                    data: dataset,
                    backgroundColor: "#b31cc6",
                    borderColor: "#b31cc6",
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        type: "linear",
                    },
                ],
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
            animation: false,
            elements: {
                point: {
                    radius: 3,
                },
            },
        },
    });
}

window.onload = () => {

    graph = drawGraph(mes(Number(5)));
    document.getElementById("calculate-button").addEventListener("click", () => {
        const date1 = new Date();
        graph = drawGraph(mes(Number(document.getElementById("inputValue").value)));
        const date2 = new Date();
        const diff = date2 - date1;
        //console.log(diff)
        const messageField = document.getElementById("time-message")
        messageField.textContent = "Calculation time in milliseconds: " + diff;

    });


    document.getElementById("animation-button").addEventListener("click", async () => {
        for (let i = 1; i < 600 && animationActive; i++) {
            graph = drawGraph(mes(Number(i)));
            await sleep(100); // Use the 'await' keyword inside an asynchronous function
            graph.update();
        }
    });
    document.getElementById("stop-button").addEventListener("click", () => {
        animationActive = false; // Zatrzymujemy animację po naciśnięciu innego guzika
        location.reload();
    });
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};





