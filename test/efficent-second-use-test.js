/* globals require, describe, it, expect, console, d3 */
'use strict';

var locald3;
var reuseOptimzedCloud;

try {
  locald3 = d3;
  reuseOptimzedCloud = d3.layout.cloud;
} catch (e) {
  locald3 = require("d3");
  reuseOptimzedCloud = require("../");
}

var calculateAndScaleMeaningfulWords = function(text) {
  var frequencyCount = {},
    whitespaceRegEx = /\s+/g,
    nonEnglishCharactersRegEx = /[^A-Za-z0-9]/g,
    LIMIT_WORDS_IN_CLOUD = 500,
    leastFrequentCount,
    mostFrequentCount;

  var isMeaningLess = function(word) {
    if (word.length <= 3) {
      return true;
    }
  };

  // Build frequency count
  text.split(whitespaceRegEx).map(function(word) {
    word = word.replace(nonEnglishCharactersRegEx, '');
    if (isMeaningLess(word)) {
      return;
    }
    frequencyCount[word] = (frequencyCount[word] || 0) + 1;
  });

  // Convert frequency count hash into an array with the x most frequent words
  frequencyCount = locald3.entries(frequencyCount).sort(function(a, b) {
    return b.value - a.value;
  }).slice(0, LIMIT_WORDS_IN_CLOUD);

  return frequencyCount;
};

var WIDTH = 960 * 1;
var HEIGHT = 600 * 1;


describe('efficient reuse', function() {

  var startTime,
    endTime,
    itterationTimes = [],
    calculateHowLongItTook,
    myReusedCloud,
    calculateMeaningfulWordsAndStartCloud;

  calculateHowLongItTook = function() {
    endTime = Date.now();
    console.log('Time', endTime - startTime);
    itterationTimes.push(endTime - startTime);
  };

  myReusedCloud = reuseOptimzedCloud()
    .padding(0)
    .size([WIDTH, HEIGHT])
    .font('Impact')
    .text(function(word) {
      return word.key;
    })
    .on('end', calculateHowLongItTook);


  calculateMeaningfulWordsAndStartCloud = function(text) {
    var frequencyCount = calculateAndScaleMeaningfulWords(text),
      leastFrequentCount,
      mostFrequentCount;

    // Make font size relative to the range between the most frequent and least frequent words
    leastFrequentCount = +frequencyCount[frequencyCount.length - 1].value || 1;
    mostFrequentCount = +frequencyCount[0].value;
    myReusedCloud.fontSize(function(wordNode) {
      return leastFrequentCount + (wordNode - leastFrequentCount) / (mostFrequentCount - leastFrequentCount);
    });

    // Set the words to this frequency count and render
    myReusedCloud.words(frequencyCount);
    myReusedCloud.start();
  };

  it('should take half as long on re-use of the cloud library', function() {

    // Run x itterations to see if it runs in linear time
    var NUMBER_OF_ITTERATIONS = 5;
    for (var i = 0; i < NUMBER_OF_ITTERATIONS; i++) {
      startTime = Date.now();
      calculateMeaningfulWordsAndStartCloud('this is a small cloud');
    }

    expect(itterationTimes.length).toEqual(NUMBER_OF_ITTERATIONS);

    expect(itterationTimes[0]).toBeGreaterThan(itterationTimes[1]);
    expect(itterationTimes[0]).toBeGreaterThan(itterationTimes[1] * 2);
  });
});
