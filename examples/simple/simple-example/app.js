(function() {

    var WIDTH = 600,
        HEIGHT = 300;

    renderAll(WIDTH, HEIGHT);

    function renderAll(width, height) {
        var svg = d3.select('svg')
            .attr('width', width)
            .attr('height', height);

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        d3.csv('mentees.csv', convert, render);

        function render(error, _data) {
            data = _data;
            x.domain(data.map((d) => d.mentee));
            y.domain([0, d3.max(data, (d) => d.mark)]);

            var barWidth = width / data.length;

            var bar = svg.selectAll('.bar')
                .data(data)
                .enter().append('rect')
                .attr('class', 'bar')
                .attr("x", (d) => x(d.mentee) )
                .attr("y", (d) => y(d.mark) )
                .attr("height", (d) => height - y(d.mark) )
                .attr("width", barWidth - 5);
        }

        function convert(row) {
            row.mark = +row.mark;
            return row;
        }
    }

})();