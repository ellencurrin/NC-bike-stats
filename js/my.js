$( document ).ready(function() {
    map1();
    makeTable();
    loadData();
    getHistory();
    $("li.timeline").hover(function() {
        $("li.description").toggleClass("show")
    });

});    


//BUILD TIMELINE
var dates = []
var titles = []
var descriptions = []
var links = []

function getHistory(){  
    $.ajax({
            type:"GET",
            url:"js/timeline.json",
            dataType:"text",
            success: parseHistory
    });
}

function parseHistory(data){
    console.log("success")
    //create an object from the JSON file
    dataObj = $.parseJSON(data);
    for (var i=0; i < dataObj.length; i++) {        
        dates.push(dataObj[i].Year);
        titles.push(dataObj[i].Title);
        descriptions.push(dataObj[i].Desc);
        links.push(dataObj[i].Link);
    }
    makeTimeline();
}

function makeTimeline(){
    for (var i=0; i<titles.length; i++){
        var date = dates[i]
        var title = titles[i]
        var desc = descriptions[i]
        var link = links[i]
        document.getElementById("timeline").innerHTML+=
            "<li class='timeline'><div><span class= 'year'>" + date + "</span>"
            + " <span class='title'><a class='link' href='" + link +"'>" + title + "</a></span></div>"
            + "<div class='description'>"+desc+"</div></li>"
    }
}

function showdiv(id){
document.getElementById(id).style.display = "block";
}

//CARTO.DB JAVASCRIPT
function map1() {
  document.getElementById("map").innerHTML = " ",
  cartodb.createVis('map', 'http://ellencurrin.cartodb.com/api/v2/viz/ca8f065e-54cf-11e4-a916-0e9d821ea90d/viz.json', {
      shareable: true,
      title: false,
      description: false,
      search: true,
      tiles_loader: true,
      center_lat: 35.392405,
      center_lon: -79.528719,
      zoom: 7
  })
  .done(function(vis, layers) {
    // layer 0 is the base layer, layer 1 is cartodb layer
    // setInteraction is disabled by default
    layers[1].setInteraction(true);
    layers[1].on('featureOver', function(e, pos, latlng, data) {
      cartodb.log.log(e, pos, latlng, data);
    });

    // you can get the native map to work with it
    // depending if you use google maps or leaflet
    map = vis.getNativeMap();

    // now, perform any operations you need
    // map.setZoom(3)
    // map.setCenter(new google.maps.Latlng(...))
  })
  .error(function(err) {
    console.log(err);
  });
}

function map2() {
  document.getElementById("map").innerHTML = " ",
  cartodb.createVis('map', 'http://ellencurrin.cartodb.com/api/v2/viz/d1bbf0e6-555a-11e4-91e8-0e9d821ea90d/viz.json', {
      shareable: true,
      title: false,
      description: false,
      search: true,
      tiles_loader: true,
      center_lat: 35.392405,
      center_lon: -79.528719,
      zoom: 7
  })
  .done(function(vis, layers) {
    // layer 0 is the base layer, layer 1 is cartodb layer
    // setInteraction is disabled by default
    layers[1].setInteraction(true);
    layers[1].on('featureOver', function(e, pos, latlng, data) {
      cartodb.log.log(e, pos, latlng, data);
    });

    // you can get the native map to work with it
    // depending if you use google maps or leaflet
    map = vis.getNativeMap();

    // now, perform any operations you need
    // map.setZoom(3)
    // map.setCenter(new google.maps.Latlng(...))
  })
  .error(function(err) {
    console.log(err);
  });
}

//HIGHCHARTS JAVASCRIPT
var years =[]
var nonfatal = []
var fatal =[]
var total =[]

function loadData(){  
    $.ajax({
            type:"GET",
            url:"js/crashseverity.json",
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
        total.push(dataObj[i].NonFatal + dataObj[i].Fatal);
    }   
    makeChart1();
}

function makeChart1(){
    Highcharts.setOptions({
        colors: ['#FECC5C','rgba(189,0,38,1)'],  
        chart: {
            style: {
                fontFamily: 'OpenSans',
            }
        }
    });
    $('#highchart1').highcharts({
        chart: {
            type: 'area'
        },
        title: false, 
            //text: 'NC Bike Accidents 1997-2012'
        //},
        //subtitle: {
            //text: 'Source: data.gov'
        //},
        xAxis: {
            categories: years,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Accidents'
            },
            labels: {

            }
        },
        tooltip: {
            crosshairs: true,
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
            },
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'Non-fatal',
            data: nonfatal,
            marker: {
                symbol: 'triangle',
                radius: 0
            }
        }, {
            name: 'Fatal',
            data: fatal,
            marker: {
                symbol: 'triangle',
                radius: 0
            }
        }]
    });
};

function makeChart2(){
    Highcharts.setOptions({
        colors: ['#FECC5C','rgba(189,0,38,1)'],  
        chart: {
            style: {
                fontFamily: 'OpenSans',
            }
        }
    });
    $('#highchart1').highcharts({
        chart: {
            type: 'area'
        },
        title: false, 
            //text: 'NC Bike Accidents 1997-2012'
        //},
        //subtitle: {
            //text: 'Source: data.gov'
        //},
        xAxis: {
            categories: years,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Percent'
            },
            labels: {

            }
        },
        tooltip: {
            crosshairs: true,
            headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span></br><table>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f})<br/>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            area: {
                stacking: 'percent',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            },
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'Non-fatal',
            data: nonfatal,
            marker: {
                symbol: 'triangle',
                radius: 0
            }
        }, {
            name: 'Fatal',
            data: fatal,
            marker: {
                symbol: 'triangle',
                radius: 0
            }
        }]
    });
};

//DATATABLE JAVASCRIPT
var dataSet =[]

function makeTable(dataSet) {   
    $('#dataTable').dataTable( {
        responsive: true,
        "ajax": "js/crashcity(1).json",
        "columns": [
            { "data": "City" },
            { "data": "1997" },
            { "data": "1998" },
            { "data": "1999" },
            { "data": "2000"},
            { "data": "2001" },
            { "data": "2002" },
            { "data": "2003" },
            { "data": "2004"},
            { "data": "2005"},
            { "data": "2006" },
            { "data": "2007" },
            { "data": "2008" },
            { "data": "2009"},
            { "data": "2010"},
            { "data": "2011" },
            { "data": "2012"},
            { "data": "Total"}
        ]       
    } );   
};

