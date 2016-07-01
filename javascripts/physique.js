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
