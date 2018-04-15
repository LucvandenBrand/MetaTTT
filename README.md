# Meta Tic-Tac-Toe
[![Build Status](https://travis-ci.org/Lukeslux/MetaTTT.svg?branch=master)](https://travis-ci.org/Lukeslux/MetaTTT)
![license](https://img.shields.io/github/license/mashape/apistatus.svg)

A recursive solution to the simplicity of tic-tac-toe.
Every field in the game can have another tic-tac-toe game embedded within.

The game is written in **ES6**, **HTML5** and **CSS3**.

## Building
Building the project is done through [NW.js](https://github.com/nwjs/nw.js) and [nw-builder](https://github.com/nwjs-community/nw-builder).

### Development
To run a development build, execute ``npm run dev`` from the root of the repository.

### Production
To produce a development build, execute ``npm run prod`` from the root of the repository. The builds will be saved into ``dist``. This folder is **ignored** by git.

## Testing
To run a test on the code, run ``npm run test`` from the root of the repository. It will test the code for behavior using [AVA](https://github.com/avajs/ava).

## Documentation
To generate documentation, run ``npm run doc`` from the root of the repository. It will ask [ESDoc](https://github.com/esdoc/esdoc) to produce some HTML documentation into ``doc``. This folder is **ignored** by git.

## Author
Luc van den Brand.
