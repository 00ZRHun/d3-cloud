# Word Cloud Layout Tests


## Usage

To run the tests in a node environment:

```bash 
$ npm install
$ npm test
```

The node test output should look something like this. 

![screen shot 2015-06-24 at 10 57 50 pm](https://cloud.githubusercontent.com/assets/196199/8346004/7dd67944-1ac4-11e5-9384-dc10d9276d27.png)


To run the tests in a browser environment, open the [SpecRunner.html](SpecRunner.html)

```bash 
$ npm install
$ cd test
$ bower install
$ open SpecRunner.html
```

The browser tests create elements so you can visually see the clouds, and it also runs the Jasmine tests where you can breakpoint and experiment with the different examples in the test cases. 

![screen shot 2015-06-24 at 7 01 52 pm](https://cloud.githubusercontent.com/assets/196199/8343543/645d60ec-1aa4-11e5-8357-d9626a4811ec.png)

![screen shot 2015-06-24 at 10 47 06 pm](https://cloud.githubusercontent.com/assets/196199/8345871/fa558570-1ac2-11e5-912a-873102fdc815.png)

![screen shot 2015-06-24 at 8 05 58 pm](https://cloud.githubusercontent.com/assets/196199/8344215/72931820-1aac-11e5-9d40-7e7e95dc401f.png)


![screen shot 2015-06-24 at 8 07 44 pm](https://cloud.githubusercontent.com/assets/196199/8344230/b083b630-1aac-11e5-8fa3-3ff080f5dfd4.png)

```
22 specs, 0 failures
d3.layout.cloud
	construction
		should return an object
		should support the new operator
	configuration
		should support immediate configuration
		should support delayed configuration
	words()
		should have a words() function which sets and/or returns the words in the cloud
		should have word objects with minimally key, and value
	size()
		should have a size() function which sets and/or returns the size of the svg of the cloud
		should survive an invalid a size()
		should survive a string size()
		should survive a negative size()
	start()
		should add svg attributes
AMD
	should add itself to d3
Simple end-to-end with render
	should draw one svg text node for each word
Replicable layout
	generate same text data
		should have equivalent data
		should use the same code but not leak state
	Redraw a new random cloud
		should have its own element
		should have word objects
		should add render attributes upon start
		should not change word objects render attributes on subsequent start()
	Redraw the same pseudorandom cloud from the same text
		should generate a seemingly random cloud
		should generate a second matching seemingly random cloud
	Redraw a persisted cloud
		should not change word objects render attributes
```