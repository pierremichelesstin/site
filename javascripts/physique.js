
    // ______________________________
    //        Motuer physique    
    // ______________________________

    function tick(e) {
        circle
            .each(cluster(15 * e.alpha * e.alpha))
            .each(collide(.5))
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
            .each(collide(.5))
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

