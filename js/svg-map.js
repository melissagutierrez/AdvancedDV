// svg-map.js

// svg-map-ex.js


function addColor(n) {
  return  n > 6 ? "#005824" :
          n > 5 ? "#238b45" :
          n > 4 ? "#41ae76" :
          n > 3 ? "#66c2a4" :
          n > 2 ? "#99d8c9" :
          n > 1 ? "#ccece6" :
                  "#edf8fb"
}

var stateCount = {};

for (i = 0; i < ncaaTeams.length; i++) {
  var state = ncaaTeams[i]["abbr"];
  if (stateCount[state]) {
    stateCount[state] += 1;
  } else {
    stateCount[state] = 1;
  }
}

console.log(stateCount);

for (var state in stateCount) {
  var stateSvg = document.getElementById(state);
  stateSvg.style.fill = addColor(stateCount[state]);
}
