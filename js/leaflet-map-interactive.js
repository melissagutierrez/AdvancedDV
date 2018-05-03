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

function style(feature) {
	return {
    fillColor: addColor(feature.properties.trains),
    weight: 2,
    opacity: 1,
    color: "#eeeeee",
    dashArray: '3',
    fillOpacity: 0.7
  };
};

// Interactive functions

// what happens when we mouseover
function highlightState(event) {
  var layer = event.target;

  layer.setStyle({
    weight: 4,
    color: "#999",
    dashArray: "",
    fillOpacity: 0.9
  });

  info.update(layer.feature.properties)

  // issues for other browsers:
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

// what happens when we mouseout
function resetHighlight(event) {
  geoJson.resetStyle(event.target);
  info.update();
}

// combine our features for one property in the geojson method
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightState,
    mouseout: resetHighlight
  });
}


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
// Modify to include variable, interactivity functions
var geoJson = L.geoJson(statesData,
  {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

// Add Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
        trains = [1, 2, 3, 4, 5, 7, 29];

    for (var i = 0; i < trains.length; i++) {
      div.innerHTML +=
        "<span style='background:" + addColor(trains[i] + 1) + "'></span> " +
        trains[i] + "<br>";
    }

    return div;
};

legend.addTo(map);



// Add Info Box

var info = L.control();

info.onAdd = function(map) {
  this.div = L.DomUtil.create("div", "info");
  this.update();
  return this.div;
};

// update the info box based on data
info.update = function(properties) {
  this.div.innerHTML = "<p>Trains</p>" + (properties ?
  "<p><strong>State</strong>: " + properties.name +
  "<strong>Trains:</strong> " + properties.trains + "</p>" :
  "Hover over a state.") // option when no details showing
};

info.addTo(map);
