## Minesweeper game

### Gameplay


[Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_(video_game)) game is a game in which you presented with a board of sqaures some of them have mine and other don't. each cell that doesn't have a mine will have instead a number that indicates the number of surrounding bombs. Your mission is to uncover every cell that doesn't have a bomb

![Capture](https://user-images.githubusercontent.com/54498156/80869740-7b554d80-8ca2-11ea-9835-7f2e0613f2ef.PNG)

### Game option

- use left click to uncover cell, once you click on a cell with bomb you will lose instantly
- use right click to mark a cell as a cell that may have bomb, using this has no effect on win logic but it just for helping you


### Score

at the lower part of the canvas you can see the time passed, and info about bombs where :- 

1. the first number is the number of uncovered cells
2. the second number is the number of bombs
3. the third number is the total number of cells


### Using

to use this game, first you have to make `Game` object, then use `begin` method 

```javascript
let game = new Game();

game.begin().then((r) => {
    console.log(r);
} , (e) => {
    console.error(e);
});
```

which return a promise with assets array as its value.

`Game` constructor takes two arguments :-

1. `canvasId` : a string value of canvas ID, the default value is `jesus`
2. `options`  : an object of options with keys :-

   * `rows` : specify the number of rows, the default value is `20`
   * `cols` : specify the number of cols, the default value is `20`
   * `cellWidth` : specify the cell length, the default value is `28`
   * `prop` : specify the game difficulty, which is any value between 1 to 100, the default value is `20`
