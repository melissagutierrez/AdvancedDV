//setting up margin and radius
var margin = {top:20, right:20, bottom:20, left:20},
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom
    radius = width/2;

// this is the color range
var color = d3.scaleOrdinal()
    .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);

// this is the arc generator
var arc = d3.arc()
    .outerRadius(radius -10)
    .innerRadius(0);

// this is the donut chart arc
var arc2 = d3.arc()
    .outerRadius(radius - 5)
    .innerRadius(radius - 95);

// this is the arc for the labels position
var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

// this is the generator
var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.count; });

// this where the define svg
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 +")");

// this is where you define the donut chart
var svg2 = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


// import the data here
d3.csv("AnimalServices.csv", function(error, data) {
  if (error) throw error;

    // this is where you parse data
    data.forEach(function(d) {
        d.count = +d.count;
        d.category = d.category;
    })

      // append g here
      var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

      // append arc here
      g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.category); })

    // transition happens here
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", tweenPie);


    //tool tip
var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) { return d.data.category + ": " + d.data.count; });
svg.call(tool_tip);

var tool_tip2 = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) { return d.data.category + ": " + d.data.count/235585 *100 +"%";});
svg.call(tool_tip2);


   // "g element is a container used to group other SVG elements"
  var g2 = svg2.selectAll(".arc2")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc2");

   // append path
  g2.append("path")
      .attr("d", arc2)
      .style("fill", function(d) { return color(d.data.category); })
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", tweenDonut);




    g2.on('mouseover', tool_tip.show)
      .on('mouseout', tool_tip.hide);

    g.on('mouseover', tool_tip2.show)
      .on('mouseout', tool_tip2.hide);



});

//  function for animation of pie chart and donut chart
function tweenPie(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}

function tweenDonut(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc2(i(t)); };
}
