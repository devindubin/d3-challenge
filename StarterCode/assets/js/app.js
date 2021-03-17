// @TODO: YOUR CODE HERE!
// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 760 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select('#scatter')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')');

d3.csv('assets/data/data.csv').then(function(raw) {
  console.log(raw)

  raw.forEach(function(d) {
    d.poverty = +d.poverty;
    d.healthcare = +d.healthcare;
  });


  // Add X axis
  let x = d3.scaleLinear()
    .domain([6, 26])
    .range([0, width])
  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))


// Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 26])
    .range([height, 0])
  svg.append('g')
    .call(d3.axisLeft(y))
        
  svg.append('g')
    .selectAll('dot')
    .data(raw)
    .enter()
    .append('circle')
      .attr('cx', function (d) { return x(d.poverty); })
      .attr('cy', function (d) { return y(d.healthcare); })
      .attr('r', 10)
      .style('fill', '#69b3a2')

  svg.append('g')
    .selectAll('dot')
    .data(raw)
    .enter()
    .append('text')
      .text(d => d.abbr)
      .attr('x', d => x(d.poverty))
      .attr('y', d => y(d.healthcare))

  svg.append("text")
    .attr("y", 0 - (margin.left / 2))
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .attr("transform", "rotate(-90)")
    .text("Percent Lacking Healthcare");

  svg.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 15})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .text("Percent in Poverty");
})
