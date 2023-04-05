function WordCloud(options) {
    var margin = {top: 10, right: 100, bottom: 0, left: 100},   // OPT: top: 70
             w = 600 - margin.left - margin.right,   // OPT: 1200, 100, 500
             h = 600 - margin.top - margin.bottom;   // OPT: 400, 1200, 100, 500
  
    // create the svg
    var svg = d3.select(options.container).append("svg")
                .attr('height', h + margin.top + margin.bottom)
                .attr('width', w + margin.left + margin.right)
  
    // set the ranges for the scales
    var xScale = d3.scaleLinear().range([10, 100]);
  
    var focus = svg.append('g')
                   .attr("transform", "translate(" + [w/2, h/2+margin.top] + ")")
  
    var colorMap = ['red', '#a38b07'];
  
    // seeded random number generator
    var arng = new alea('hello.');
  
    var data;
    d3.json(options.data, function(error, d) {
      if (error) throw error;
      data = d;
      var word_entries = d3.entries(data['count']);
      xScale.domain(d3.extent(word_entries, function(d) {return d.value;}));
  
      makeCloud();
  
      function makeCloud() {
        d3.layout.cloud().size([w, h])
                 .timeInterval(20)
                 .words(word_entries)
                 .fontSize(function(d) { return xScale(+d.value); })
                 .text(function(d) { return d.key; })
                 .font("Impact")
                 .random(arng)
                 .on("end", function(output) {
                   // sometimes the word cloud can't fit all the words- then redraw
                   // https://github.com/jasondavies/d3-cloud/issues/36
                   if (word_entries.length !== output.length) {
                     console.log("not all words included- recreating");
                     makeCloud();
                     return undefined;
                   } else { draw(output); }
                 })
                 .start();
      }
  
      d3.layout.cloud().stop();
  
    });
  
    function draw(words) {
      focus.selectAll("text")
           .data(words)
           .enter().append("text")
           .style("font-size", function(d) { return xScale(d.value) + "px"; })
           .style("font-family", "Impact")
           .style("fill", function(d, i) { return colorMap[~~(arng() *2)]; })
           .attr("text-anchor", "middle")
           .attr("transform", function(d) {
             return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
           })
           .text(function(d) { return d.key; })
           .on('mouseover', handleMouseOver)
           .on('mouseout', handleMouseOut)
           .on("click", function (d, i){
              console.log("d.key = ", d.key);
              // window.open("https://twitter.com/search?q=This", "_blank")
              // window.open("https://twitter.com/search?q=" + text, "_blank")
              // window.open("https://twitter.com/search?q=" + d.key, "_blank")
              ids = data['ids'][d.key]
              console.log("ids = " + ids);
              id_arr = String(ids).split(",")
              console.log("id_arr = " + id_arr);
              idx = Math.round(Math.random() * (id_arr.length-1))
              console.log("idx = " + idx);
              id = id_arr[idx];
              console.log("id = " + id);
              window.open("http://twitter.com/twitter/statuses/" + id, "_blank")
           });
    }
  
    function handleMouseOver(d) {
      var group = focus.append('g')
                       .attr('id', 'story-titles');
       var base = d.y - d.size;
  
      group.selectAll('text')
           .data(data['sample_title'][d.key])
           .enter().append('text')
           .attr('x', d.x)
           .attr('y', function(title, i) {
             return (base - i*14);
           })
           .attr('text-anchor', 'middle')
           .text(function(title) { return title; });
  
      var bbox = group.node().getBBox();
      var bboxPadding = 5;
  
      // place a white background to see text more clearly
      var rect = group.insert('rect', ':first-child')
                    .attr('x', bbox.x)
                    .attr('y', bbox.y)
                    .attr('width', bbox.width + bboxPadding)
                    .attr('height', bbox.height + bboxPadding)
                    .attr('rx', 10)
                    .attr('ry', 10)
                    .attr('class', 'label-background-strong');
    }
  
    function handleMouseOut(d) {
      d3.select('#story-titles').remove();
    }
  }