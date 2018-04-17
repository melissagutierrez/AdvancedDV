//setting up margin and radius
var margin = {top:20, right:20, bottom:20, left:20},
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom
    radius = width/2;

// color range
var color = d3.scaleOrdinal()
    .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);

// arc generator
var arc = d3.arc()
    .outerRadius(radius -10)
    .innerRadius(0);

// donut chart arc
var arc2 = d3.arc()
    .outerRadius(radius - 5)
    .innerRadius(radius - 95);

// arc for the labels position
var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);



// pie generator
var pie = d3.pie()
.sort(null)
.value(function(d) {return d.count;});

// define svg- attaching svg to body @ the center
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 +")");

// define the svg donut chart
var svg2 = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// import data
d3.csv("Animal_Services.csv", function(error, data) {
  if (error) throw error;

    // parse data
    data.forEach(function(d) {
        d.count = +d.count;
        d.category = d.category;
    })


      // append g
      var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

      // append the arc path
      g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.category); })

    // transition
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", tweenPie);

      // append labels
      /*
    g.append("text")
        .attr("transform", function (d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) {return d.data.category + ": " + d.data.count/235585 *100 +"%";})
    */

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


   // append text
/*
    g2.append("text")
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.count / 235585*100 +"%" ; });
    */


    g2.on('mouseover', tool_tip.show)
      .on('mouseout', tool_tip.hide);

    g.on('mouseover', tool_tip2.show)
      .on('mouseout', tool_tip2.hide);



});

// Helper function for animation of pie chart and donut chart
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
