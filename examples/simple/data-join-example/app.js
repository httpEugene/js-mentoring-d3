(function() {

    var WIDTH = 600,
        HEIGHT = 300,
        data;

    renderAll(WIDTH, HEIGHT);

    function renderAll(width, height) {
        var count = 0;
        var svg = d3.select('svg')
            .attr('width', width)
            .attr('height', height);

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        if (!data) {
            d3.csv('mentees.csv', convert, render);
        }
        else {
            render();
        }

        function render(error, _data) {
            data = data || _data;
            x.domain(data.map((d) => d.mentee));
            y.domain([0, d3.max(data, (d) => d.mark)]);

            var barWidth = width / data.length;

            var bar = svg.selectAll('.bar')
                .data(data);

            bar.exit()
                .remove();

            bar.enter()
                .append("rect");

            bar.attr("class", "bar")
                .attr("id", (d) => d.id)
                .attr("x", (d) => x(d.mentee) )
                .attr("y", (d) => y(d.mark) )
                .attr("height", (d) => height - y(d.mark) )
                .attr("width", barWidth - 5)
                .on("click", removeItem);
        }

        function removeItem() {
            var index = data.findIndex((item) => {return item.id === +this.id});
            data.splice(index, 1);
            render();
        }

        function convert(row) {
            row.mark = +row.mark;
            row.id = count++;
            return row;
        }
    }

    window.onresize = (e) => {
        if (e.target.innerWidth < WIDTH) {
            renderAll(e.target.innerWidth, HEIGHT);
        }
    };

})();