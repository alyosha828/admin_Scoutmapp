getStatInfo();
function getStatInfo() {
    $.get(`/getStats?startDate=2017-01-01&endDate=${new Date().toISOString()}`, function (response) {
        console.log(response)
        if (response && response.length > 0){
            makeDataSets(response)
        }
    });
}
function makeDataSets(data)
{        
    var labels = [];
    var datasets = [];
    var dataRow = [];
    var backgroundColor = [];
    for (const idx in data){        
        labels.push(data[idx].eventType);
    }
    for (const idx in data){  
        var dataVal = [];
        for (const idxIn in data){
            dataVal.push(data[idxIn].numberPulled)
        }
        var rowData = {
            label : data[idx].affiliateID,
            data : dataVal,
            backgroundColor : getRandomColor(),
        }
        datasets.push(rowData);
    }
    var barData = {
         labels,
         datasets 
    }
    onLoadChart(barData);
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
var horizontalChart;
function onLoadChart(barData) {
    var ctx = document.getElementById("barChart").getContext("2d");
    horizontalChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: barData,
        responsive: false,
        options: chartConfig
    });
}
var barData = {
    labels: ["Bill1", "Bill2", "Bill3", "Bill4", "Bill5", "Bill6", "Bill7"],
    datasets: [
        {
            label: "Gross Orders",
            data: [78, 58, 60, 39, 26, 67, 50],
            backgroundColor: 'green',
            // yAxisID: 'first-y-axis',
            // xAxisID: 'first-x-axis'
        },
        {
            label: "Net Approved",
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: 'blue',
            // yAxisID: 'second-y-axis',
            // xAxisID: 'second-x-axis'
        },        
        {
            label: "Approval Rate",
            data: [38, 58, 60, 29, 76, 47, 20],
            backgroundColor: 'grey',
            // yAxisID: 'second-y-axis',
            // xAxisID: 'second-x-axis'
        },        
        {
            label: "Retention Rate",
            data: [78, 58, 20, 19, 16, 37, 10],
            backgroundColor: 'red',
            // yAxisID: 'second-y-axis',
            // xAxisID: 'second-x-axis'
        }
    ]
};

