(function() {

    append();
    //select();
    //setTimeout(selectAll, 2000);

    function append() {
        d3.select('svg')
            .append('circle')
            .attr('r', 10)
            .attr('cx', 200)
            .attr('cy', 50)
            .attr('fill', 'green');
    }

    function select() {
        d3.select('circle')
            .attr('r', 20);
    }

    function selectAll() {
        d3.selectAll('circle')
            .attr('r', 15)
            .attr('fill', 'red')
            .attr('stroke', 'brown')
            .attr('stroke-width', 5)
    }


})();