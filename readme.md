[WIP experimental support for WebWorkers]

# What is es6module ?
This is a starting point for a JS library (not a frontend framework-based thing)
It's a simple module architecture using [Rollup](http://rollupjs.org) to bundle the code in one single source file. There will be three output bundles, in three directories:
- `dist`, with a **umd** bundle and its *minified* equivalent (bundles with dependencies if there is any)
- `lib`, with a **commonjs** bundle, mostly for Node usage (does not bundle with dependencies)
- `es`, with a **es module** bundle, mostly for ES usage (does not bundle with dependencies)

None of these is transpiled into *ES5* and this package does not use Babel.

Code documentation can also be generated thanks to [Documentation.js](http://documentation.js.org/) that uses the [JSDoc](http://usejsdoc.org/) syntax.

## Using es6module as a base
**es6module** is not made to be used as-is, but rather to be a starting-point/boilerplate to make your own module. Here is the list of things to change to make it yours:

The entry-point of the module is `src/index.js`, of course, you should rename this file with the name of your choice.

In `package.json` file, look for the string `es6module` and change all its occurrence with the name of your choice. The file `rollup.config.js` does not need any edits because it uses variables from `package.json`.

Some usage examples are provided in the `examples/` folder.

# Dev mode
```bash
$ npm run dev
```
Does:
- watches for source modifications
- makes all except the minified umd bundle
- serves on a `http://localhost:PORT/` where `PORT` is a random number in [3000, 6000]. This is copied into the clipboard

# Build your module
Using Rollup from the script:  
```bash
$ npm run build
```
This builds all the 4 outputs.

# Lint
Es6modules uses eslint and the set of rules defined by [Airbnb](https://github.com/airbnb/javascript) + some minor adjustments.  
Run the linter to simply display errors and warnings:
```bash
$ npm run lint
```

To fix:
```bash
$ npm run lint -- --fix
```

# How to use my module?
The advantage of the *umd* package specification is that it's compatible everywhere: Node, Browser and ES6 import.

From HTML:
```html
<script src="../dist/es6module.js"></script>
<!-- Or with the minified bundle -->
<script src="../dist/es6module.min.js"></script>
```

From Node:
```js
const es6module = require("es6module");
```

From ES6:
```js
import es6module from 'es6module';
```

Then, no matter your setup, you can use *es6module* the same way:
```js
var foo = new es6module.Foo(20, 30);

// do something with foo
foo.printAnAttribute();
foo.setAnAttribute(34)
foo.printAnAttribute();
```

# Documentation
Even if you code only for yourself, a bit of documentation can not hurt :) .  
Use the [JSDoc](http://usejsdoc.org/) syntax and then run:  
```bash
$ npm run doc
```
Two kinds of documentations will be generated: a HTML kind in `doc/` ([here](http://me.jonathanlurie.fr/es6module/doc/)) and a markdown kind in `./documentation.md` ([here](https://github.com/jonathanlurie/es6module/blob/master/documentation.md)).

# Extra
Since I clone this repo a lot and use it as a start for almost every new project, I've decided to create a script to:
- clone (with depth=1)
- remove the `.git` folder
- remove files and folder that are going to be replaced anyway (doc, dist bundles)
- replace the every "es6module" by "mynewfancymodule"
- removes readme's content
- run `npm install`

```bash
function es6module(){
  git clone --depth=1 --branch=master https://github.com/jonathanlurie/es6module.git  $1
  cd $1
  rm -rf .git
  rm -rf dist/* documentation.md doc/* package-lock.json
  find . -type f -iname '*' -exec sed -i '' "s/es6module/$1/g" "{}" +;
  printf "# $1\n[here goes the readme]\n" > readme.md
  npm install
}
```

Copy the script to the `.bashrc` and to run it:
```bash
es6module mynewfancymodule
```

# TODO
- Add a testing framework
