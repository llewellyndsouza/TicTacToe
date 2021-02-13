const Gameboard = (function () {
  let board = [];
  const resetGame = () => (board = []);
  const addMove = (player, row, col) => {
    board.push({ playername: player, row: row, col: col });
  };
  return {
    resetGame,
    addMove,
  };
})();

const DisplayController = (function () {
  function generateGrid() {
    //Generates the grid
  }

  function loadButtons() {
    //let Xbuttons = document.querySelectorAll("#x");
    document.querySelectorAll("#x").forEach((item) => {
      item.addEventListener("click", (event) => {
        console.log(`button x`);
        console.log(event);
      });
    });
    document.querySelectorAll("#o").forEach((item) => {
      item.addEventListener("click", (event) => {
        console.log(`button o`);
        console.log(event);
      });
    });
  }

  const init = () => {
    generateGrid();
    loadButtons();
  };

  return { init };
})();

const Player = function (name) {
  let score = 0;
  let PlayerName = name;
  const getName = () => PlayerName;
  const getScore = () => score;
  const wins = function () {
    score++;
  };
  return {
    getName,
    wins,
    getScore,
  };
};

const Game = (function () {
  const newGame = function (
    player1 = Player("test"),
    player2 = Player("test")
  ) {
    Gameboard.resetGame();
  };
  return { newGame };
})();

//
let p1 = Player("player1");
let p2 = Player("player2");

//
Game.newGame(p1, p2);


DisplayController.init();
