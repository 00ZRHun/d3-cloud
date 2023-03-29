/* globals require, describe, it, expect, console, d3 */
'use strict';

var locald3;
var cloud;
var Canvas;

try {
  locald3 = d3;
  cloud = d3.layout.cloud;
} catch (e) {
  Canvas = require("canvas");
  locald3 = require("d3");
  cloud = require("../");
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

  // Make font size relative to the range between the most frequent and least frequent words
  // leastFrequentCount = +frequencyCount[frequencyCount.length - 1].value || 1;
  // mostFrequentCount = +frequencyCount[0].value;
  // frequencyCount.map(function(wordNode) {
  //   wordNode.size = leastFrequentCount + (wordNode.size - leastFrequentCount) / (mostFrequentCount - leastFrequentCount);
  // });

  return frequencyCount;
};


var SHORT_TEXT = "Hello world normally you want more words than this example.";
var wordsByFrequency = calculateAndScaleMeaningfulWords(SHORT_TEXT);
var WIDTH = 960 * 1;
var HEIGHT = 600 * 1;

describe('d3.layout.cloud', function() {

  describe('construction', function() {

    it('should return an object', function() {
      var myCloud = cloud();
      expect(myCloud).toBeDefined();
    });

    it('should support the new operator', function() {
      var Cloud = cloud;
      var myNewedCloud = new Cloud();
      expect(myNewedCloud).toBeDefined();
    });

  });

  describe('configuration', function() {

    it('should support immediate configuration', function() {
      var myChainConfiguredCloud = cloud()
        .padding(0)
        .size([WIDTH, HEIGHT])
        .font('Impact')
        .text(function(word) {
          return word.key;
        })
        .on('end', function() {
          // Normally draw here
        });

      expect(myChainConfiguredCloud).toBeDefined();
      expect(myChainConfiguredCloud.size()).toEqual([WIDTH, HEIGHT]);
    });

    it('should support delayed configuration', function() {
      var myConfiguredCloud = cloud();
      expect(myConfiguredCloud).toBeDefined();

      myConfiguredCloud.padding(10);

      myConfiguredCloud.size([WIDTH, HEIGHT]);
      expect(myConfiguredCloud.size()).toEqual([WIDTH, HEIGHT]);

      myConfiguredCloud.font('Impact');

      myConfiguredCloud.text(function(word) {
        return word.key;
      });
    });

  });

  describe('words()', function() {

    var myWordCloud = cloud()
      .padding(0)
      .size([WIDTH, HEIGHT])
      .font('Impact')
      .text(function(word) {
        return word.key;
      })
      .on('end', function() {
        // Normally draw here
      });

    it('should have a words() function which sets and/or returns the words in the cloud', function() {
      myWordCloud.words(wordsByFrequency);
      expect(myWordCloud.words().length).toEqual(9);
    });

    it('should have word objects with minimally key, and value', function() {
      myWordCloud.words(wordsByFrequency);
      var sampleWordObject = myWordCloud.words()[1];
      expect(sampleWordObject.key).toEqual('world');
      expect(sampleWordObject.value).toEqual(1);
    });

  });

  describe('size()', function() {

    var mySizeCloud = cloud()
      .size([300, 400]);

    it('should have a size() function which sets and/or returns the size of the svg of the cloud', function() {
      expect(mySizeCloud.size()).toEqual([300, 400]);
    });

    it('should survive an invalid a size()', function() {
      expect(mySizeCloud.size([null, null]).size()).toEqual([256, 256]);
    });

    it('should survive a string size()', function() {
      expect(mySizeCloud.size(['22', '505.4']).size()).toEqual([22, 505.4]);
    });

    it('should survive a negative size()', function() {
      expect(mySizeCloud.size([-20, -30.5]).size()).toEqual([256, 256]);
    });
  });

  describe('start()', function() {

    var myStartedCloud = cloud()
      .canvas(function() {
        if (typeof document !== 'undefined') {
          return document.createElement('canvas');
        } else {
          return new Canvas(1, 1);
        }
      })
      .padding(0)
      .size([WIDTH, HEIGHT])
      .font('Impact')
      .text(function(word) {
        return word.key;
      })
      .on('end', function() {
        // Normally draw here
      });

    it('should add svg attributes', function() {
      expect(wordsByFrequency[2].key).toEqual('normally');
      expect(wordsByFrequency[2].value).toEqual(1);

      myStartedCloud.words(wordsByFrequency);
      var sampleWordObject = myStartedCloud.words()[1];
      expect(sampleWordObject.key).toEqual('world');
      expect(sampleWordObject.value).toEqual(1);

      expect(sampleWordObject.text).toBeUndefined();
      expect(sampleWordObject.font).toBeUndefined();
      expect(sampleWordObject.style).toBeUndefined();
      expect(sampleWordObject.weight).toBeUndefined();
      expect(sampleWordObject.rotate).toBeUndefined();
      expect(sampleWordObject.size).toBeUndefined();
      expect(sampleWordObject.padding).toBeUndefined();
      expect(sampleWordObject.width).toBeUndefined();
      expect(sampleWordObject.height).toBeUndefined();
      expect(sampleWordObject.xoff).toBeUndefined();
      expect(sampleWordObject.yoff).toBeUndefined();
      expect(sampleWordObject.x1).toBeUndefined();
      expect(sampleWordObject.y1).toBeUndefined();
      expect(sampleWordObject.x0).toBeUndefined();
      expect(sampleWordObject.y0).toBeUndefined();
      expect(sampleWordObject.hasText).toBeUndefined();
      expect(sampleWordObject.x).toBeUndefined();
      expect(sampleWordObject.y).toBeUndefined();

      myStartedCloud.start();
      expect(sampleWordObject.text).toEqual(sampleWordObject.key);
      expect(sampleWordObject.font).toEqual('Impact');
      expect(sampleWordObject.style).toEqual('normal');
      expect(sampleWordObject.weight).toEqual('normal');

      expect(sampleWordObject.rotate).toBeDefined();
      expect(sampleWordObject.size).toBeDefined();
      expect(sampleWordObject.padding).toBeDefined();
      expect(sampleWordObject.width).toBeDefined();
      expect(sampleWordObject.height).toBeDefined();
      expect(sampleWordObject.xoff).toBeDefined();
      expect(sampleWordObject.yoff).toBeDefined();
      expect(sampleWordObject.x1).toBeDefined();
      expect(sampleWordObject.y1).toBeDefined();
      expect(sampleWordObject.x0).toBeDefined();
      expect(sampleWordObject.y0).toBeDefined();
      expect(sampleWordObject.hasText).toBeDefined();
      expect(sampleWordObject.x).toBeDefined();
      expect(sampleWordObject.y).toBeDefined();
      // expect(sampleWordObject.sprite).toBeDefined();
    });
  });
});
