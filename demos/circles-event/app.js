(function() {

    d3.selectAll('circle')
        .on('click', function() {
            this.remove();
        });

})();