# Word Cloud Layout Examples

# Server side render

### Node

[node.js](node.js) will produce an `.svg` which you can open in a vector graphics editor such as Inkscape or Gimp.

```bash
$ npm install
$ ./examples/node.js
```

![node](https://cloud.githubusercontent.com/assets/196199/8345818/6c065434-1ac2-11e5-9d14-57071fd2c356.png)



# Browser render

### Reproducable cloud

[replicable-layout-spec.html](../test/replicable-layout-spec.html) Shows how to write a draw function that will let the cloud keep its previous layout, or use a random seed to always draw the same layout for the same text.

![screen shot 2015-06-24 at 10 47 06 pm](https://cloud.githubusercontent.com/assets/196199/8345871/fa558570-1ac2-11e5-912a-873102fdc815.png)


### Simple

[simple.html](simple.html) is a compact example which shows how to use the library with some standard random generation.

![simple](https://cloud.githubusercontent.com/assets/196199/8345811/62837982-1ac2-11e5-9384-98f3db08f667.png)


### RequireJS

[requirejs.html](requirejs.html) Shows how to set up your require paths so that d3 and d3.layout.cloud are working.

![require](https://cloud.githubusercontent.com/assets/196199/8345813/628569b8-1ac2-11e5-8f55-e919e22575b5.png)


### Animated

[animated.html](animated.html) Shows how to run an animation on a Tom Sawyer text.

![animated2](https://cloud.githubusercontent.com/assets/196199/8345823/785f7094-1ac2-11e5-92b7-c7403fc6b7ec.png)

### Easy Word Cloud wrapper

[easy.html](easy.html) shows how you can set some easy options using the `src/easy-word-cloud.js` library.

![easy](https://cloud.githubusercontent.com/assets/196199/8345812/6283f268-1ac2-11e5-96d7-4b57758e0116.png)


### Fit overflow

[simple_with_overflow.html](simple_with_overflow.html) Shows an example where really large words are still drawn when they dont fit. This is something that is under progress in the issue tracker https://github.com/jasondavies/d3-cloud/issues/36


![fit_overflow](https://cloud.githubusercontent.com/assets/196199/8345882/2468540a-1ac3-11e5-92cd-9ad91f4c7c02.png)



### Recursive fit performance test

[lots-of-words.html](lots-of-words.html) Shows an example with 2000+ unicode words


![lots_of_words](https://user-images.githubusercontent.com/196199/32422212-023d64a2-c26d-11e7-9c71-75bd86e83500.png)
