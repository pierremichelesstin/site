function asyncCounter(numCalls, callback) {
    this.callback = callback;
    this.numCalls = numCalls;
    this.calls = 0;
}

asyncCounter.prototype.increment = function() {
    this.calls++;
    if (this.calls >= this.numCalls) {
        this.callback(); //cette methode est appellee quand tous les fichiers sont charges
    }
}


var myAsyncCounter = new asyncCounter(1, draw); //1 pour un fichier a charger, 2... 3...

var jsonLivresb;
//truc qui toune
d3.json("javascripts/livres2.json", function(data) {
    jsonLivresb = data;
    myAsyncCounter.increment();});


function draw() { //fonction appellee quand le compteur de telechargements atteind la limite definie ligne 14 //efface le truc qui toune
    var jsonLivres_lengthb = Object.keys(jsonLivresb).length;

    var width = 50,
        height = 50;

    var svg = d3.select("graphe2").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px solid black");

}

