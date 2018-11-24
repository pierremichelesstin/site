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
    var subgenres = RES_genre_mngmt.data_subgenre;
    var subgenres_name = RES_genre_mngmt.data_name_subgenre;
    //clusters = RES_genre_mngmt.data_subgenre;

    var width = 800,
        height = 800,
        padding = 4, // separation between same-color circles
        clusterPadding = 6; // separation between different-color circles
    
    // contour 
    var svg = d3.select("graphe2").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px solid black");

    //titre
    var text_p = "Biblioth\xE8que de " + taille_bibliotheque + " livres repr\xE9sent\xE9e virtuellement sous forme de XXX";
    var titre_principal = svg.selectAll("XXX21")
        .data([1])
        .enter()
        .append("text")
        .attr("x", 5)
        .attr("y", 14)
        .text(text_p)
        .attr("font-family", "Tahoma")
        .attr("font-size", 16)
        .attr("fill", "black");
    
     var titres_livres = svg.selectAll("XXX22")
        .data(jsonLivres)
        .enter()
        .append("text")
        .attr("x", 35)
        .attr("y", function(d, i) {
            return 50 + i * 10
        })
        .text(function(d) {
            return d.titre;
        })
        .attr("font-family", "Tahoma")
        .attr("font-size", 16)
        .attr("fill",  function(d, i) {
            return subgenres[subgenres_name.indexOf(jsonLivres[i].subgenre)].color;
        });
       
         var rectangles_livres = svg.selectAll("XXX22")
        .data(jsonLivres)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * 10
        })
        .attr("y", function(d, i) {
            return i * 10
        })
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill",  function(d, i) {
            return subgenres[subgenres_name.indexOf(jsonLivres[i].subgenre)].color;
        });
}
