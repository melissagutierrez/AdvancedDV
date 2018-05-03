// leaflet-map-interactive.js

function addColor(n) {
  return  n > 10 ? "#0093ff" :
          n > 6 ? "#26a9fe" :
          n > 5 ? "#4bbdfe" :
          n > 4 ? "#71cefd" :
          n > 3 ? "#96ddfd" :
          n > 2 ? "#a9e4fd" :
          n > 1 ? "#cef0fc" :
                  "#e0f5fc"
}

function style(features) {
	return {
    fillColor: addColor(features.properties.trains),
    weight: 2,
    opacity: 1,
    color: "#ffffff",
    dashArray: '3',
    fillOpacity: 0.9
  };
};


// Count trains from each state
var stateCount = {};

for (i = 0; i < trains.length; i++) {
  var state = trains[i]["state"];
  if (stateCount[state]) {
    stateCount[state] += 1;
  } else {
    stateCount[state] = 1;
  }
};


// Add team count data to statesData object
for (i = 0; i < statesData["features"].length; i++) {
	var state = statesData["features"][i]["properties"]["name"];
	statesData["features"][i]["properties"]["trains"] = stateCount[state] || 0;
}


// Leaflet setup
var map = L.map("map").setView([38.01, -95.84], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 15,
	attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(map);

// Add GeoJSON overlay
L.geoJson(statesData, {style: style}).addTo(map);


// Adding a legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
        trains = [1, 2, 3, 4, 5, 7, 29];

    // loop through trains to create legend
    for (var i = 0; i < trains.length; i++) {

      // Our template:
      // <span style="background: #<value>"></span> #

      div.innerHTML +=
        "<span style='background:" + addColor(trains[i] + 1) + "'></span> " +
        trains[i] + "<br>";
    }

    return div;
};

legend.addTo(map);
