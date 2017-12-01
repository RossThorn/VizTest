// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 500,
    height = 500;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var y = d3.scaleTime().range([height, 0]);
var x = d3.scaleLinear().range([0, width]);

// define the area
var area = d3.area()
    .x(function(d) { return x(d.close); })
    .y0(height)
    .y1(function(d) { return y(d.date); });

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.close); })
    .y(function(d) { return y(d.date); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("data.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
  });

  // scale the range of the data
  y.domain(d3.extent(data, function(d) { return d.date; }));
  x.domain([0, d3.max(data, function(d) { return d.close; })]);

  // add the area
    svg.append("path")
       .data([data])
       .attr("class", "area")
       .attr("d", area);

  // add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});
