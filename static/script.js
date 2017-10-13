// needs work:
// emptying fields after calculation
// visual cues for over-constrained / under-constrained states

var lastSolution = "";
var lastEntry = "";

$(document).ready(function(){
  $("#title").css('color', '#ee2');

  $("#s").val(100);
  $("#n").val(3);
  $("#d").val(5);
  $("#l").val(8);

  update();

  $("#s").keyup(function(e) { lastEntry = "#s"; run(e); });
  $("#n").keyup(function(e) { lastEntry = "#n"; run(e); });
  $("#d").keyup(function(e) { lastEntry = "#d"; run(e); });
  $("#l").keyup(function(e) { lastEntry = "#l"; run(e); });
  $("#q").keyup(function(e) { lastEntry = "#q"; run(e); });

  $("#s").on("click", function() { empty("#s"); });
  $("#n").on("click", function() { empty("#n"); });
  $("#d").on("click", function() { empty("#d"); });
  $("#l").on("click", function() { empty("#l"); });
  $("#q").on("click", function() { empty("#q"); });
});

function run(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if (code == 13) {
    update();
  }
}

function empty(element) {
  // console.log("empty > emptying " + element);
  // console.log("empty > lastSolution: " + lastSolution);
  // console.log("empty > lastEntry: " + lastEntry);
  $(element).val("");

  if (lastSolution != "") {
    let temp = lastSolution;
    lastSolution = "";
    empty(temp);
  }

  update();
}

function getInputs() {
  var s = $("#s").val();  // speed
  var n = $("#n").val();  // number of plungers
  var d = $("#d").val();  // plunger diameter
  var l = $("#l").val();  // stroke
  var q = $("#q").val();  // flowrate
  return [s,n,d,l,q];
}

function update() {
  var inputs = getInputs();
  var len = inputs.length;
  var boolConstrained = false;
  var count = 0;
  var solveFor;
  for (let i=0; i<len; i++) {
    if (inputs[i] === "" || inputs[i] === null) {
      count++;
      solveFor = inputs[i];
    }
  }
  if (count === 1) {
    boolConstrained = true;
    $("#state").text("Perfectly constrained");
  } else if (count < 1) {
    $("#state").text("Over constrained");
  } else {
    $("#state").text("Under constrained");
  }
  if (boolConstrained) {
    calculate(solveFor)
  }
}

function calculate(param) {
  var inputs = getInputs();
  var s = inputs[0];
  var n = inputs[1];
  var d = inputs[2];
  var l = inputs[3];
  var q = inputs[4];

  switch(param) {
    case s:
      var s = q / (0.25 * Math.PI * Math.pow(d, 2) * l * n * 1/231);
      $("#s").val(s.toFixed(2));
      $("#s").css('background-color', '#ee2');
      $("#s").animate({ backgroundColor: '#fff' }, 100);
      lastSolution = "#s";
      // break;
    case n:
      var n = q / (0.25 * Math.PI * Math.pow(d, 2) * l * s * 1/231);
      $("#n").val(n.toFixed(2));
      showUpdate(n);
      lastSolution = "#n";
      // break;
    case d:
      var d = Math.sqrt( q / (0.25 * Math.PI * l * n * s * 1/231) );
      $("#d").val(d.toFixed(2));
      showUpdate(d);
      lastSolution = "#d";
      // break;
    case l:
      var l = q / (0.25 * Math.PI * Math.pow(d, 2) * s * n * 1/231);
      $("#l").val(l.toFixed(2));
      showUpdate(l);
      lastSolution = "#l";
      // break;
    case q:
      // FLOWRATE = 0.25 * PI * D^2 * l * n * s * C
      // C = constant = 1 gal/min / 231 in^3/min
      var q = 0.25 * Math.PI * Math.pow(d, 2) * l * n * s * 1/231;
      $("#q").val(q.toFixed(2));
      showUpdate(q);
      lastSolution = "#q";
      // break;
  }

  $(lastSolution).css('background-color', '#2ee');
  $(lastSolution).animate({backgroundColor:'#fff'}, 1000);
}

function showUpdate(param) {
  var element = "#"+param;
  $(element).css('background-color', '#ee2');
  $(element).animate({ backgroundColor: '#fff' }, 100);
}
