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

function genre_mngmt(Livres) {
    
var jsonLivres_length = Object.keys(Livres).length;

var taille_bibliotheque = 0;
data_names_subgenre=[];// Noms des genres
data_names_subgenre_counter=[];// Nombre de livre par genre
for (i = 0; Livres.length > i; i += 1) {
    taille_bibliotheque = taille_bibliotheque + Livres[i].tomes;// Nombre de livres dans la bibliothèques
  
    subgenre_i=Livres[i].subgenre;
    subgenre2_i=Livres[i].subgenre2;
    tomes_i=Livres[i].tomes;
    // PREMIER GENRE
    var indice_subgenre_i = data_names_subgenre.indexOf(subgenre_i);// recherche du genre
    if(indice_subgenre_i==-1){
        data_names_subgenre.push(subgenre_i);// Il n'existe pas, on l'ajoute
        data_names_subgenre_counter.push(tomes_i);// On compte les livres
    }
    else {// Il existe
        data_names_subgenre_counter[indice_subgenre_i]=data_names_subgenre_counter[indice_subgenre_i]+tomes_i;// On compte les livres
    }
    // SECOND GENRE
    if(subgenre2_i!=undefined){// Il ya un second genre
        // recherche du second genre
        var indice_subgenre2_i = data_names_subgenre.indexOf(subgenre2_i);
        if(indice_subgenre2_i==-1){
            data_names_subgenre.push(subgenre2_i);// Il n'existe pas, on l'ajoute
            data_names_subgenre_counter.push(tomes_i);// On compte les livres
        }
        else {// Il existe
            data_names_subgenre_counter[indice_subgenre2_i]=data_names_subgenre_counter[indice_subgenre2_i]+tomes_i;
        }
    }
};

var scale_genre = 0;
var scale_genre_c = 20;

var clusters_data_temp = [{
  name: data_names_subgenre[0],
  tomes: data_names_subgenre_counter[0],
  radius: data_names_subgenre_counter[0] * scale_genre + scale_genre_c,
  color: "rgb(200, 100, 200)",
  type: "genre",
  cluster: 0
},{
  name: data_names_subgenre[1],
  tomes: data_names_subgenre_counter[1],
  radius: data_names_subgenre_counter[1] * scale_genre + scale_genre_c,
  color: "rgb(150, 50, 150)",
  type: "genre",
  cluster: 1
}, {
  name: data_names_subgenre[2],
  tomes: data_names_subgenre_counter[2],
  radius: data_names_subgenre_counter[2] * scale_genre + scale_genre_c,
  color: "rgb(100, 100, 100)",
  type: "genre",
  cluster: 2
},{
  name: data_names_subgenre[3],
  tomes: data_names_subgenre_counter[3],
  radius: data_names_subgenre_counter[3] * scale_genre + scale_genre_c,
  color: "rgb(000, 080, 150)",
  type: "genre",
  cluster: 3
}, {
  name: data_names_subgenre[4],
  tomes: data_names_subgenre_counter[4],
  radius: data_names_subgenre_counter[4] * scale_genre + scale_genre_c,
  color: "rgb(000, 180, 240)",
  type: "genre",
  cluster: 4
}, {
  name: data_names_subgenre[5],
  tomes: data_names_subgenre_counter[5],
  radius: data_names_subgenre_counter[5] * scale_genre + scale_genre_c,
  color: "rgb(080, 200, 170)",
  type: "genre",
  cluster: 5
}, {
  name: data_names_subgenre[6],
  tomes: data_names_subgenre_counter[6],
  radius: data_names_subgenre_counter[6] * scale_genre + scale_genre_c,
  color: "rgb(050, 120, 100)",
  type: "genre",
  cluster: 6
}, {
  name: data_names_subgenre[7],
  tomes: data_names_subgenre_counter[7],
  radius: data_names_subgenre_counter[7] * scale_genre + scale_genre_c,
  color: "rgb(000, 190, 000)",
  type: "genre",
  cluster: 7
}, {
  name: data_names_subgenre[8],
  tomes: data_names_subgenre_counter[8],
  radius: data_names_subgenre_counter[8] * scale_genre + scale_genre_c,
  color: "rgb(000, 000, 000)",
  type: "genre",
  cluster: 8
}, {
  name: data_names_subgenre[9],
  tomes: data_names_subgenre_counter[9],
  radius: data_names_subgenre_counter[9] * scale_genre + scale_genre_c,
  color: "rgb(220, 050, 000)",
  type: "genre",
  cluster: 9
}, {
  name: data_names_subgenre[10],
  tomes: data_names_subgenre_counter[10],
  radius: data_names_subgenre_counter[10] * scale_genre + scale_genre_c,
  color: "rgb(220, 110, 000)",
  type: "genre",
  cluster: 10
},{
  name: data_names_subgenre[11],
  tomes: data_names_subgenre_counter[11],
  radius: data_names_subgenre_counter[11] * scale_genre + scale_genre_c,
  color: "rgb(230, 180, 000)",
  type: "genre",
  cluster: 11
}];
var RES = {};
RES.clusters_data=clusters_data_temp;
RES.nodes_data_name=data_names_subgenre;
RES.data_names_subgenre_counter=data_names_subgenre_counter;
return RES;

console.log(data_names_subgenre);

}


var myAsyncCounter = new asyncCounter(1, draw); //1 pour un fichier a charger, 2... 3...

var jsonLivresb;
//truc qui toune
d3.json("javascripts/livres.json", function(data) {
    jsonLivres = data;
    RES_genre_mngmt = genre_mngmt(jsonLivres);
    myAsyncCounter.increment();});

function draw() { //fonction appellee quand le compteur de telechargements atteind la limite definie ligne 14 //efface le truc qui toune
var nodes_data = RES_genre_mngmt.clusters_data;
var nodes_data_name = RES_genre_mngmt.nodes_data_name;
var scale_livre = 1;
var scale_livre_c = 10;
for (i = 0; jsonLivres.length > i; i += 1) {
  //var nodes_data_offset = Object.keys(nodes_data).length;
  //var links_data_offset = Object.keys(links_data).length;
  nodes_data.push({
    name: jsonLivres[i].titre,
    tomes: jsonLivres[i].tomes,
    radius: jsonLivres[i].tomes * scale_livre + scale_livre_c,
    color: nodes_data[nodes_data_name.indexOf(jsonLivres[i].subgenre)].color,
    type: "livre",
    cluster: nodes_data_name.indexOf(jsonLivres[i].subgenre),
    subgenre: jsonLivres[i].subgenre,
    cluster2: nodes_data_name.indexOf(jsonLivres[i].subgenre2),
    subgenre2: jsonLivres[i].subgenre2,
  });
}

var width = 1000,
  height = 575,
  padding = 4, // separation between same-color circles
  clusterPadding = 6; // separation between different-color circles


nodes = nodes_data;
clusters = RES_genre_mngmt.clusters_data;

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
  .data(clusters)
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
  .data(clusters)
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
      return nodes_data[nodes_data_name.indexOf(d.subgenre2)].color;
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


function tick(e) {
  circle
    .each(cluster(15 * e.alpha * e.alpha))
    .each(collide(.4))
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
    .each(cluster_2(25 * e.alpha * e.alpha))
    .each(collide(.4))
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

}

