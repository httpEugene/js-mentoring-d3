(function() {

    var data = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

    render();

    setTimeout(modify, 2000);
    setTimeout(modifyRemove, 4000);

    function modify() {
        data[4] = 11;
        render();
    }

    function modifyRemove() {
        var a = data.splice(4,1);
        data.push(a);
        render();
    }

    function render() {
        var selection = d3.select('svg')
            .selectAll('circle')
            .data(data);

        selection.enter()
            .append('circle');

        selection.exit()
            .remove();

        selection
            .attr('r', (d) => d/2)
            .attr('cx', (d) => d*2.5)
            .attr('cy', (d) => d*1.5);
    }

})();