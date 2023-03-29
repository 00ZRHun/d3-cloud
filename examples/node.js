#!/usr/local/bin/node

(function() {
  'use strict';

  var d3 = require('d3');
  var JSDOM = require("jsdom").JSDOM;
  global.document = new JSDOM("<!DOCTYPE html><body></body>").window.document;
  var cloud = require('../');
  var fs = require('fs');

  // Hoist all vars
  var document,
    myFewWords,
    myCloud,
    myColorFunction,
    myDrawFunction;

  document = global.document;

  // Short hand to build an array of word objects with random importance
  myFewWords = "Server side render into .SVG file which you can open in Gimp or Inkscape".split(" ")
    .map(function(word) {
      return {
        text: word,
        importance: 10 + Math.random() * 60
      };
    });

  // Each word object actually looks like this
  myFewWords.push({
    text: "example",
    importance: 10
  });

  myColorFunction = d3.scale.category20();

  // Ask d3-cloud to make an cloud object for us
  myCloud = cloud();

  // Configure our cloud with d3 chaining
  myCloud
    .size([400, 400])
    .words(myFewWords)
    .padding(5)
    .rotate(function() {
      return ~~(Math.random() * 2) * 90;
    })
    .font("Impact")
    .fontSize(function(word) {
      return word.importance;
    })
    .on("end", function(words) {
      myDrawFunction(words, document.body);
    });


  // Declare our own draw function which will be called on the "end" event
  myDrawFunction = function(words, element) {
    var svg = d3.select(element).append("svg");
    svg.attr("width", 400)
      .attr("height", 400)
      .append("g")
      .attr("transform", "translate(200,200)")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(word) {
        return word.importance + "px";
      })
      .style("font-family", "Impact")
      .style("fill", function(word, i) {
        return myColorFunction(i);
      })
      .attr("text-anchor", "middle")
      .attr("transform", function(word) {
        return "translate(" + [word.x, word.y] + ")rotate(" + word.rotate + ")";
      })
      .text(function(word) {
        return word.text;
      });
  };

  // Run the render when you're ready
  myCloud.start();

  // Output the .svg or .html results to file, or res.send(document.body.innerHTML) if you are in a server context
  console.log('Open output.svg and/or output.html to see the rendered output\n', document.body.innerHTML);
  fs.writeFileSync('output.html', document.body.innerHTML);
  fs.writeFileSync('output.svg', document.body.innerHTML);
})();
