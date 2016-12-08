d3.select('#add').on('click', add);
d3.select('#remove').on('click', remove);

const selection = d3.select('svg');
const data = [5, 10, 15, 20, 25];

create();

function create() {
	selection.selectAll('circle')
    		.data(data)
	    .enter()
	    .append('circle')
	    	.attr('r', (d) => d)
	    	.attr('cx', (d) => d * 10)
	    	.attr('cy', (d) => d);
}

function add() {
	selection.append('circle')
		.attr('r', getRandomCoefficient() * 3)
    	.attr('cx', getRandomCoefficient() * 30)
    	.attr('cy', getRandomCoefficient() * 30);
    console.log('add');
}

function remove() {
	const [circles] = selection.selectAll('circle');
	if (circles.length) {
		circles[getRandomIndex(circles.length)].remove();
	}
    console.log('remove');
}

function getRandomCoefficient() {
	return Math.floor((Math.random() * 10) + 1);
}

function getRandomIndex(arrayLength) {
	return Math.floor(Math.random() * arrayLength);
}

var x = d3.scale.linear()
    .domain([12, 24])
    .range(["0px", "720px"]);

    console.log(x(14));