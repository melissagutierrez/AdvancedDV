// leaflet-map-chloropleth.js

// Apply colors
function addColor(n) {
  return  n > 6 ? "#005824" :
          n > 5 ? "#238b45" :
          n > 4 ? "#41ae76" :
          n > 3 ? "#66c2a4" :
          n > 2 ? "#99d8c9" :
          n > 1 ? "#ccece6" :
                  "#edf8fb"
}

// Instead of applying colors directly to the SVG, we create a style
// object to be added to our geoJSON overlay.

function style(features) {
	return {
    fillColor: addColor(features.properties.teams),
    weight: 2,
    opacity: 1,
    color: "#eeeeee",
    dashArray: '3',
    fillOpacity: 0.9
  };
}


// First we must process our data. Let's count the teams from each
// state. We'll then merge this with our statesData object.

var stateCount = {};

for (i = 0; i < ncaaTeams.length; i++) {
  var state = ncaaTeams[i]["state"];
  if (stateCount[state]) {
    stateCount[state] += 1;
  } else {
    stateCount[state] = 1;
  }
}

// This takes some understanding of the statesData object to properly
// target the "properties" object, then add a "teams" key. As we
// iterate over each state, we apply the stateCount value ... or a 0
// if the state does not appear in stateCount. We want to make sure
// our object is standardized.

for (i = 0; i < statesData["features"].length; i++) {
	var state = statesData["features"][i]["properties"]["name"];
	statesData["features"][i]["properties"]["teams"] = stateCount[state] || 0;
}


// Now we can set up Leaflet!

var map = L.map("map").setView([38.01, -95.84], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 15,
	attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(map);

// Add GeoJSON overlay
L.geoJson(statesData, {style: style}).addTo(map);
