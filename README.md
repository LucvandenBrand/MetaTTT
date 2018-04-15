# :video_game: Meta Tic-Tac-Toe
A recursive solution to the simplicity of tic-tac-toe.
Every field in the game can have another tic-tac-toe game embedded within.

The game is written in **ES6**, **HTML5** and **CSS3**.

## :wrench: Building
Building the project is done through [NW.js](https://github.com/nwjs/nw.js) and [nw-builder](https://github.com/nwjs-community/nw-builder).

### Development
To run a development build, execute ``npm run dev`` from the root of the repository.

### Production
To produce a development build, execute ``npm run prod`` from the root of the repository. The builds will be saved into ``build``. This folder is **ignored** by git.

## :ballot_box_with_check: Testing
To run a test on the code, run ``npm run test`` from the root of the repository. It will lint the code for style using [XO](https://github.com/xojs/xo) and will test the code for behavior using [AVA](https://github.com/avajs/ava).

## :ledger: Documentation
To generate documentation, run ``npm run doc`` from the root of the repository. It will ask [ESDoc](https://github.com/esdoc/esdoc) to produce some HTML documentation into ``doc``. This folder is **ignored** by git.

## :black_nib: Author
Luc van den Brand.
