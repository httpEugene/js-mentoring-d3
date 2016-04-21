(function () {
    var HEIGHT = 400, WIDTH = 600;

    Circle.counter = 0;
    var circles = Array.from(new Array(20), () => new Circle());

    setInterval(function() {
        circles.push(new Circle(true));
    }, 2000);

    requestAnimationFrame(animate);

    function animate() {
        circles.forEach((c) => c.run());
        circles.sort((a, b) => (a.r < b.r) ? 1 : ((b.r < a.r) ? -1 : 0));
        circles.forEach(findColission);
        circles = circles.filter((item) => item.r);

        render();
        requestAnimationFrame(animate);
    }

    function render() {
        var selection = d3.select('svg')
            .selectAll('circle')
            .data(circles);

        selection.enter()
            .append('circle')
                .style("opacity", 0)
                .transition()
                .style("opacity", 1)
                .duration(5000);

        selection.exit()
            .transition()
                .attr("r", 0)
            .remove();

        selection
            .attr('id', (circle) => circle.id)
            .attr('r', (circle) => circle.r)
            .attr('cx', (circle) => circle.cx)
            .attr('cy', (circle) => circle.cy)
            .attr('fill', (circle) => circle.color);

        selection
            .on('click', function() {
                circles.find((circle) => circle.id === +this.id).die();
            })
    }

    function findColission(circle, i, array) {
        for (var j = i + 1; j < array.length; j++) {
            var other = array[j];
            var distance = Math.sqrt((circle.cx-other.cx)*(circle.cx-other.cx) + (circle.cy-other.cy)*(circle.cy-other.cy));
            if (distance < (circle.r + other.r)) {
                circle.r += other.r / Math.PI;
                other.die();
            }
        }
    }

    function Circle(topLeft) {
        this.id = Circle.counter++;
        this.r = Math.floor(Math.random() * 15) + 10;
        this.cx = !topLeft ? Math.floor(Math.random() * (WIDTH - 120)) + 100 : this.r + 50;
        this.cy = !topLeft ? Math.floor(Math.random() * (HEIGHT - 120)) + 100 : this.r + 50;
        this.direction = {
            x: Math.floor(Math.random() * 2) * 2 - 1,
            y: Math.floor(Math.random() * 2) * 2 - 1
        }
    }

    Circle.prototype.run = function () {
        this.cx += this.direction.x;
        this.cy += this.direction.y;

        if (this.cx - this.r <= 0 || this.cx + this.r >= WIDTH) {
            this.direction.x *= -1;
        }
        if (this.cy - this.r <= 0 || this.cy + this.r >= HEIGHT) {
            this.direction.y *= -1;
        }

        this.r *= 0.9995;
        this.color = this.colorPicker(this.r);
    };

    Circle.prototype.colorPicker = function(r) {
        var picker = d3.scale.linear()
            .domain([5, 50])
            .range(['yellow', 'darkorange']);

        return picker(r);
    };

    Circle.prototype.die = function() {
        this.r = 0;
    }

})();