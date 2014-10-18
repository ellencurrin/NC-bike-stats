
//use ajax to auto-load these variables with data...
var years =[]
var nonfatal = []
var fatal =[]

//build chart
$( document ).ready(function() {
    loadData();
});

function loadData(){
    
    $.ajax({
            type:"GET",
            url:"crashseverity.json",
            dataType:"text",
            success: parseData
    });
}


function parseData(data){
    //create an object from the JSON file
    dataObj = $.parseJSON(data);
    for (var i=0; i < dataObj.length; i++) {        
        years.push(dataObj[i].Year);
        nonfatal.push(dataObj[i].NonFatal);
        fatal.push(dataObj[i].Fatal);
    }   
    makeChart1();        
}



function makeChart1(){
    $('#container1').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'NC Bike Accidents 1997-2012'
        },
        subtitle: {
            text: 'Source: data.gov'
        },
        xAxis: {
            categories: years,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Cyclists'
            },
            labels: {

            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        tooltip: {
            headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: 'Fatal',
            data: fatal
        }, {
            name: 'Non-fatal',
            data: nonfatal
        }]
    });
};