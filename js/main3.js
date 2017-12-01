var width = 200,
    height = 200;

// Config for the Radar chart
var config = {
    w: width,
    h: height,
    maxValue: 100,
    levels: 5,
    ExtraWidthX: 300
};


//Call function to draw the Radar chart
d3.json("radardata2.json", function(error, data) {
  console.log(data);
    if (error) throw error;
    RadarChart.draw("#chart", data, config);
});

// var svg = d3.select('body')
// 	.selectAll('svg')
// 	.append('svg')
// 	.attr("width", width)
// 	.attr("height", height);
