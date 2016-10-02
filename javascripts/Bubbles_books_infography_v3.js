function asyncCounter(numCalls, callback) {//Initialisation pour loader les fichiers
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
    RES_genre_mngmt = genre_mngmt(jsonLivres); // 3 variables de sorties
    // 1) RES.data_subgenre avec toutes les infos d'un subgenre
    // 2) RES.data_name_subgenre les noms des subgenre
    // 3) RES.data_counter_subgenre le nombre de livre par subgenre
    myAsyncCounter.increment();// on incremente car le fichier est chargé
});


function draw() { //Fonction appellee quand le compteur de telechargements atteind la limite dans myAsyncCounter

    // Récuperation des variables de la fonction genre_mngmt
    var taille_bibliotheque = RES_genre_mngmt.taille_bibliotheque;
    var nodes = RES_genre_mngmt.data_subgenre;
    var nodes_name = RES_genre_mngmt.data_name_subgenre;
    clusters = RES_genre_mngmt.data_subgenre;

    // Création des ronds
    var scale_livre = 1;
    var scale_livre_c = 10;
    var currentIndex = jsonLivres.length;
     for (i = 0; jsonLivres.length > i; i += 1)  {
        nodes.push({
            name: jsonLivres[i].titre,
            tomes: jsonLivres[i].tomes,
            radius: jsonLivres[i].tomes * scale_livre + scale_livre_c,
            color: nodes[nodes_name.indexOf(jsonLivres[i].subgenre)].color,
            type: "livre",
            cluster: nodes_name.indexOf(jsonLivres[i].subgenre),
            subgenre: jsonLivres[i].subgenre,
            cluster2: nodes_name.indexOf(jsonLivres[i].subgenre2),
            subgenre2: jsonLivres[i].subgenre2,
        });
    }

    var width = 1000,
        height = 650,
        padding = 4, // separation between same-color circles
        clusterPadding = 6; // separation between different-color circles

    var force = d3.layout.force()
        .nodes(nodes)
        .size([width, height])
        .gravity(0)
        .charge(0)
        .alpha(2)
        .on("tick", tick)
        .start();

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
        .on("click", function(d, i) {
            selec_genre = i;
            label.attr("dx", -100)
                .attr("dy", -100);
            label.filter(function(d) {
                    return (d.cluster == selec_genre | d.cluster2 == selec_genre);
                })
                .attr("dx", 5)
                .attr("dy", function(d, i) {
                    return 42 + i * 16;
                });
            force.on("tick", tick_2)
                .start();
        });

    var rectangle_label = svg.selectAll("text")
        .data(RES_genre_mngmt.data_subgenre)
        .enter().append("text")
        .filter(function(d) {
            return d.type == "genre"
        })
        .text(function(d) {
            return d.name;
        })
        .attr("x", width - 125)
        .attr("y", function(d, i) {
            return 46 + i * 45;
        })
        .attr("font-family", "Tahoma")
        .attr("font-size", 12)
        .style("fill", function(d) {
            return d.color;
        });

    var circle = svg.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", function(d) {
            return d.radius;
        })
        .attr("fill", function(d) {
            if (d.type == "genre") {
                return "white";
            } else {
                return d.color;
            }
        })
        .attr("stroke-width", function(d) {
            return 6;
        })
        .attr("stroke", function(d) {
            if (d.type == "genre") {
                return d.color;
            } else if (d.subgenre2 != null) {
                return nodes[nodes_name.indexOf(d.subgenre2)].color;
            }
        })
        .call(force.drag)
        .on("mouseover", function(d) {
            name_temp = d.name;
            label.filter(function(d) {
                    return (d.name == name_temp & d.type == "livre")
                })
                .attr("font-size", 18)
        })
        .on("mouseout", function(d) {
            name_temp = d.name;
            label.filter(function(d) {
                    return (d.name == name_temp & d.type == "livre")
                })
                .attr("font-size", 14)
        });;

    var label = svg.selectAll("text2")
        .data(nodes)
        .enter().append("text")
        .text(function(d) {
            if (d.type == "genre") {
                label_temp = "Dans la biblioth\xE8que il y a " + d.tomes + " livres dont le genre est: " + d.name;
            } else {
                label_temp = d.name;
                if (d.tomes > 1) {
                    label_temp = label_temp + " (" + d.tomes + " tomes)";
                }
            }
            return label_temp;
        })
        .attr("font-family", "Tahoma")
        .attr("font-size", 14)
        .style("fill", function(d) {
            return d.color;
        })
        .attr("dx", -100)
        .attr("dy", -100);



    var text_p = "Biblioth\xE8que de " + taille_bibliotheque + " livres repr\xE9sent\xE9e virtuellement sous forme d'une grappe de bulles";
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


    var rectangle_reset = svg.selectAll("rect3")
        .data([1])
        .enter().append("rect")
        .attr("x", 5)
        .attr("y", function() {
            return height - 35
        })
        .attr("width", 100)
        .attr("height", 30)
        .style("fill", "black")
        .on("click", function() {
            label.attr("dx", -100)
                .attr("dy", -100);
            force.on("tick", tick)
                .start();
        });

    var rectangle_reset_label = svg.selectAll("text3")
        .data([1])
        .enter().append("text")
        .text("Reset")
        .attr("x", 10)
        .attr("y", function() {
            return height - 16
        })
        .attr("font-family", "Tahoma")
        .attr("font-size", 14)
        .style("fill", "white");
        
    // ______________________________
    //        Motuer physique    
    // ______________________________

    function tick(e) {
        circle
            .each(cluster(15 * e.alpha * e.alpha))
            .each(collide(.2))
            .attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            });
    }

    // Move d to be adjacent to the cluster node.
    function cluster(alpha) {
        return function(d) { // d est un noeud ou pas
            var cluster = clusters[d.cluster], // on prends le cluster correspondant au noeud
                k = 1;
            // si le noeud est un cluster
            if (cluster === d) {
                cluster = {
                    x: 0.5 * width,
                    y: 0.5 * height,
                    radius: -d.radius
                }
                k = .1 * Math.sqrt(d.radius);
            }
            var x = d.x - cluster.x,
                y = d.y - cluster.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + cluster.radius;
            if (l != r) {
                l = (l - r) / l * alpha * k;
                d.x -= x *= l;
                d.y -= y *= l;
                cluster.x += x;
                cluster.y += y;
            }
        };
    }

    function tick_2(e) {
        circle
            .each(cluster_2(15 * e.alpha * e.alpha))
            .each(collide(.2))
            .attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            });
    }

    function cluster_2(alpha) {
        return function(d) { // d est un noeud ou pas
            var cluster = clusters[d.cluster], // on prends le cluster correspondant au noeud
                cluster2 = clusters[d.cluster2],
                k = 1;
            // si le noeud est un cluster
            if (cluster === d) {
                if (d.cluster == selec_genre) {
                    cluster = {
                        x: 0.6 * width,
                        y: 0.4 * height,
                        radius: -d.radius
                    };
                } else {
                    cluster = {
                        x: 0.5 * width,
                        y: 3 * height,
                        radius: -d.radius
                    };
                }
                k = .1 * Math.sqrt(d.radius);
            }
            if (d.cluster2 == selec_genre) { // on refais le cluster avec les livres dont le genre2 est celui qui est selectionne
                cluster = cluster2; // on change alors le cluster des ces ronds
            }
            var x = d.x - cluster.x,
                y = d.y - cluster.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + cluster.radius;
            if (l != r) {
                l = (l - r) / l * alpha * k;
                d.x -= x *= l;
                d.y -= y *= l;
                cluster.x += x;
                cluster.y += y;
            }
        };
    }

    // Resolves collisions between d and all other circles.
    function collide(alpha) {
        var quadtree = d3.geom.quadtree(nodes);
        return function(d) {
            var r = d.radius + Math.max(padding, clusterPadding),
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
                    if (l < r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    }
        
}
