var chartConfig = {
    responsive : true,
    scales: {
        xAxes: [
            {
                stacked: false,
                // id: 'first-x-axis',
                // type: 'linear',
                gridLines: {
                    offsetGridLines: true,
                    display: true,
                    circular: true,
                    color: 'rgba(255, 255, 255, 0.1)',
                    // borderDash	:	[5,10,20,25],
                    // borderDashOffset	:	2 ,
                    lineWidth: 1,
                    drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    tickMarkLength: 10,
                    zeroLineWidth: 2,
                    zeroLineColor: 'rgba(255, 255, 255, 1)',
                    // zeroLineBorderDash	:	[5,10,20,25],
                    // zeroLineBorderDashOffset	:	2                            
                },
                // position : 'bottom',
            },
            // {
            //     stacked: true,
            //     id: 'second-x-axis',
            //     type: 'linear',
            //     gridLines: {
            //         offsetGridLines: true
            //     },
            //     position : 'bottom',
            // }
        ],
        yAxes: [
            {
                stacked: false,
                // id: 'first-y-axis',
                // type: 'linear',
                gridLines: {
                    offsetGridLines: true,
                    display: true,
                    circular: true,
                    color: 'rgba(255, 255, 255, 0.1)',
                    // borderDash	:	[5,10,20,25],
                    // borderDashOffset	:	2 ,
                    lineWidth: 1,
                    drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    tickMarkLength: 10,
                    zeroLineWidth: 2,
                    zeroLineColor: 'rgba(168, 168, 168, 0.5)',
                    // zeroLineBorderDash	:	[5,10,20,25],
                    // zeroLineBorderDashOffset	:	2
                },
                // position : 'left',
            },
            // {
            //     stacked: true,
            //     id: 'second-y-axis',
            //     type: 'linear',
            //     gridLines: {
            //         offsetGridLines: true
            //     },
            //     position : 'right',
            // }
        ]
    },
    legend: {
        // display : true,

        position: 'bottom',
        fullWidth: true,
        onClick: function (e, legendItem) {
            var index = legendItem.datasetIndex;
            var ci = this.chart;
            var meta = ci.getDatasetMeta(index);
            // See controller.isDatasetVisible comment
            meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
            // We hid a dataset ... rerender the chart
            ci.update();
        },
        onHover: function (e, legendItem) {
            var index = legendItem.datasetIndex;
            var ci = this.chart;
            var meta = ci.getDatasetMeta(index);
            // See controller.isDatasetVisible comment
            // meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;                
            // // We hid a dataset ... rerender the chart
            // ci.update();
        },
        reverse: false,
        labels: {
            // This more specific font property overrides the global property
            boxWidth: 40,
            fontColor: 'red',
            fontSize: 14,
            fontFamily: 'Arial',
            fontStyle: 'normal',
            padding: 10,
            // generateLabels : null,
            // filter : function() {},
            usePointStyle: false
        }
    },
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    },
    animation: {
        duration: 500,
        easing: 'easeInOutQuad',
        onProgress: function (animation) {
            // console.log(animation.animationObject.currentStep / animation.animationObject.numSteps);
        },
        onComplete: function (animation) {
            // console.log('Complete', animation);
        }
    },
    title: {
        display: true,
        position: 'bottom',
        fontSize: 14,
        fontFamily: 'Arial',
        fontColor: '#FFF',
        fontStyle: 'bold',
        padding: 10,
        lineHeight: 1.2,
        // text: 'Horizantal Chart'
    },
    tooltips: {
        enabled: true,
        custom: function (tooltipModel) {
            // Tooltip Element
            // var tooltipEl = document.getElementById('chartjs-tooltip');

            // // Create element on first render
            // if (!tooltipEl) {
            //     tooltipEl = document.createElement('div');
            //     tooltipEl.id = 'chartjs-tooltip';
            //     tooltipEl.innerHTML = "<table></table>";
            //     document.body.appendChild(tooltipEl);
            // }

            // // Hide if no tooltip
            // if (tooltipModel.opacity === 0) {
            //     tooltipEl.style.opacity = 0;
            //     return;
            // }

            // // Set caret Position
            // tooltipEl.classList.remove('above', 'below', 'no-transform');
            // if (tooltipModel.yAlign) {
            //     tooltipEl.classList.add(tooltipModel.yAlign);
            // } else {
            //     tooltipEl.classList.add('no-transform');
            // }

            // function getBody(bodyItem) {
            //     return bodyItem.lines;
            // }

            // // Set Text
            // if (tooltipModel.body) {
            //     var titleLines = tooltipModel.title || [];
            //     var bodyLines = tooltipModel.body.map(getBody);

            //     var innerHtml = '<thead>';

            //     titleLines.forEach(function(title) {
            //         innerHtml += '<tr><th>' + title + '</th></tr>';
            //     });
            //     innerHtml += '</thead><tbody>';

            //     bodyLines.forEach(function(body, i) {
            //         var colors = tooltipModel.labelColors[i];
            //         var style = 'background:' + colors.backgroundColor;
            //         style += '; border-color:' + colors.borderColor;
            //         style += '; border-width: 2px';
            //         var span = '<span style="' + style + '"></span>';
            //         innerHtml += '<tr><td>' + span + body + '</td></tr>';
            //     });
            //     innerHtml += '</tbody>';

            //     var tableRoot = tooltipEl.querySelector('table');
            //     tableRoot.innerHTML = innerHtml;
            // }

            // // `this` will be the overall tooltip
            // var position = this._chart.canvas.getBoundingClientRect();

            // // Display, position, and set styles for font
            // tooltipEl.style.opacity = 1;
            // tooltipEl.style.position = 'absolute';
            // tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            // tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            // tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            // tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
            // tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            // tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
            // tooltipEl.style.pointerEvents = 'none';
        },
        mode: 'nearest',
        intersect: true,
        position: 'average',
        callbacks: {
            // label: function(tooltipItem, data) {
            //     var label = data.datasets[tooltipItem.datasetIndex].label || '';

            //     if (label) {
            //         label += ': ';
            //     }
            //     label += Math.round(tooltipItem.yLabel * 100) / 100;
            //     return label;
            // },
            // labelColor: function(tooltipItem, chart) {
            //     return {
            //         borderColor: 'rgb(255, 0, 0)',
            //         backgroundColor: 'rgb(255, 0, 0)'
            //     }
            // },
            // labelTextColor:function(tooltipItem, chart){
            //     return '#543453';
            // }
        },
        // itemSort : null,
        // filter : function () {},
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFontFamily: 'Arial',
        titleFontSize: 10,
        titleFontStyle: 'bold',
        titleFontColor: '#FFF',
        titleSpacing: 2,
        titleMarginBottom: 6,
        bodyFontFamily: 'Arial',
        bodyFontSize: 12,
        bodyFontStyle: 'bold',
        bodyFontColor: '#FFF',
        bodySpacing: 2,
        footerFontFamily: 'Arial',
        footerFontSize: 12,
        footerFontStyle: 'bold',
        footerFontColor: '#FFF',
        footerSpacing: 2,
        footerMarginTop: 10,
        xPadding: 5,
        yPadding: 5,
        caretPadding: 3,
        caretSize: 6,
        cornerRadius: 10,
        multiKeyBackground: '#FFF',
        displayColors: true,
        borderColor: 'rgba(1,1,1,0)',
        borderWidth: 1
    },
    elements: {
        point: {
            radius: 5,
            pointStyle: 'rect',
            rotation: 0,
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderWidth: 2,
            borderColor: 'rgba(0,0,0,0.1)',
            hitRadius: 2,
            hoverRadius: 5,
            hoverBorderWidth: 2
        },
        line: {
            tension: 0.4,
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderWidth: 3,
            borderColor: 'rgba(0,0,0,0.1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: 'miter',
            capBezierPoints: true,
            fill: true,
            stepped: false
        },
        rectangle: {
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0.1)',
            borderSkipped: 'bottom'
        },
        arc: {
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderColor: '#FFF',
            borderWidth: 2
        }
    }
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