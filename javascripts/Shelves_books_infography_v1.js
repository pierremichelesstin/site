function asyncCounter(numCalls, callback) { //Initialisation pour loader les fichiers
    this.callback = callback;
    this.numCalls = numCalls;
    this.calls = 0;
}

asyncCounter.prototype.increment = function() {
    this.calls++;
    if (this.calls >= this.numCalls) {
        this.callback(); //Cette methode est appellée quand tous les fichiers sont charg2s
    }
}

var myAsyncCounter = new asyncCounter(1, draw); //1 pour un fichier a charger, 2... 3...

d3.json("javascripts/livres.json", function(data) {
    jsonLivres = data;
    var currentIndex = jsonLivres.length;
    while (0 !== currentIndex) {
        var randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        var temporaryValue = jsonLivres[currentIndex];
        jsonLivres[currentIndex] = jsonLivres[randomIndex];
        jsonLivres[randomIndex] = temporaryValue;
    }
    RES_genre_mngmt = genre_mngmt(jsonLivres); // 3 variables de sorties
    // 1) RES.data_subgenre avec toutes les infos d'un subgenre
    // 2) RES.data_name_subgenre les noms des subgenre
    // 3) RES.data_counter_subgenre le nombre de livre par subgenre
    myAsyncCounter.increment(); // on incremente car le fichier est chargé
});


function draw() { //Fonction appellee quand le compteur de telechargements atteind la limite dans myAsyncCounter

    // Récuperation des variables de la fonction genre_mngmt
    var taille_bibliotheque = RES_genre_mngmt.taille_bibliotheque;
    var nodes = RES_genre_mngmt.data_subgenre;
    var nodes_name = RES_genre_mngmt.data_name_subgenre;
    clusters = RES_genre_mngmt.data_subgenre;

    var width = 800,
        height = 800,
        padding = 4, // separation between same-color circles
        clusterPadding = 6; // separation between different-color circles

    var svg = d3.select("graphe2").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px solid black");

    var rectangle = svg.selectAll("rect")
        .data(RES_genre_mngmt.data_subgenre)
        .enter().append("rect")
        .filter(function(d) {
            return d.type == "genre"
        })
        .attr("x", width - 130)
        .attr("y", function(d, i) {
            return 50 + i * 45
        })
        .attr("width", 125)
        .attr("height", 25)
        .style("fill", function(d) {
            return d.color
        })

}
