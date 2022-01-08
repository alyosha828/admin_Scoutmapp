function onLoadSubChart(chartId, barData) {
    var ctx = document.getElementById(chartId).getContext("2d");
    var horizontalChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: barData,
        responsive: false,
        options: chartConfig
    });
}

getStatInfo();
function getStatInfo() {
    $.get(`/getStats?startDate=2017-01-01&endDate=${new Date().toISOString()}`, function (response) {
        console.log(response)
        if (response && response.length > 0) {
            makeDataSets(response)
        }
    });
}
function makeDataSets(data) {
    var labels = [];
    var datasets = [];
    var dataRow = [];
    var backgroundColor = [];
    for (const idx in data) {
        labels.push(data[idx].eventType);
    }
    for (const idx in data) {
        var dataVal = [];
        for (const idxIn in data){
            dataVal.push(data[idxIn].numberPulled)
        }
        var rowData = {
            label: `${data[idx].datePulled.split('T')[0].split('-')[1]}-${data[idx].datePulled.split('T')[0].split('-')[2]}`,
            data: dataVal,
            backgroundColor: getRandomColor(),
        }
        datasets.push(rowData);
    }
    var barData = {
        labels,
        datasets
    }
    for (var i = 0; i <= 5; i++) {
        onLoadSubChart(`barChart${i}`, barData);
    }    
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
