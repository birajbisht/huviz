

// creating a random dataset using underscore js
var dataset = _.map(_.range(40), function (i) {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: Math.random() * 15,
  };
});

// create margin
var margin = {top: 20, right: 20, bottom: 40, left: 40};

var w = 600 - margin.left - margin.right,
    h = 200 - margin.top - margin.bottom;

var svg = d3.select('#chartArea').append('svg')
  .attr('width', w + margin.left + margin.right)
  .attr('height', h + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var xScale = d3.scale.linear()
  .domain([0, 100])
  .range([0, w]);


var yScale = d3.scale.linear()
  .domain([0, d3.max(dataset, function (d) {
  return d.y;
})])
 .range([h, 0]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')
  .ticks(5)
  .innerTickSize(5)
  .outerTickSize(2)
  .tickPadding(5)

svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', 
        'translate(0, '+ 
        (h + 0) + ')')
  .call(xAxis);

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient('left')
  .ticks(5)
  .innerTickSize(5)
  .outerTickSize(2)
  .tickPadding(5)

svg.append('g')
  .attr('class', 'y axis')
  .attr('transform', 
        'translate(0, '+ 
        (0) + ')')
  .call(yAxis);


svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('class', 'scatter')
  .attr('cx', function (d) {
  return xScale(d.x);
})
  .attr('cy', function (d) {
  return yScale(d.y);
})
  .attr('r', function (d) {
  return d.r;
});