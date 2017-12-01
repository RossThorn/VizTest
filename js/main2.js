var data = [
  {
    className: 'year1', // optional can be used for styling
    axes: [
      {axis: "Pine", value: 13},
      {axis: "Maple", value: 60},
      {axis: "Oak", value: 50},
      {axis: "Spruce", value: 90},
      {axis: "Birch", value: 20},
      {axis: "Willow", value: 10},
      {axis: "Aspen", value: 20}
    ],

  },
  {
    className: 'year2', // optional can be used for styling
    axes: [
      {axis: "Pine", value: 50},
      {axis: "Maple", value: 90},
      {axis: "Oak", value: 50},
      {axis: "Spruce", value: 15},
      {axis: "Birch", value: 17},
      {axis: "Willow", value: 40},
      {axis: "Aspen", value: 20}
    ]
  },
  {
    className: 'year3',
    axes: [
      {axis: "Pine", value: 60},
      {axis: "Maple", value: 70},
      {axis: "Oak", value: 10},
      {axis: "Spruce", value: 13},
      {axis: "Birch", value: 90},
      {axis: "Willow", value: 11},
      {axis: "Aspen", value: 30}
    ]
  }

];

function randomDataset() {

  return data.map(function(d) {
    return {
      className: d.className,
      axes: d.axes.map(function(axis) {
        return {axis: axis.axis, value: Math.ceil(Math.random() * 100)};
      })
    };
  });
};

var chart = RadarChart.chart();
var cfg = chart.config(); // retrieve default config
var svg = d3.select('body').append('svg')
  .attr('width', cfg.w + cfg.w + 50)
  .attr('height', cfg.h + cfg.h / 4);
svg.append('g').classed('single', 1).datum(randomDataset()).call(chart);

var rando = randomDataset();
console.log(rando);

//many radars
chart.config({w: cfg.w / 4, h: cfg.h / 4, axisText: false, levels: 0, circles: false});
cfg = chart.config();
function render() {
  var game = svg.selectAll('g.game').data(
    [
      randomDataset(),
      randomDataset(),
      randomDataset(),
      randomDataset()
    ]
  );
  game.enter().append('g').classed('game', 1);
  game.attr('transform', function(d, i) { return 'translate('+((cfg.w * 4) + 50 + (i * cfg.w))+','+ (cfg.h * 1.3) +')'; })
    .call(chart);

  setTimeout(render, 1000);
}
render();




RadarChart.draw(".chart-container", data);
