const Gameboard = (function () {
  let board = [];
  let set1 = [];
  let set2 = [];
  let winningLines = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
  ];
  const resetGame = () => {
    board = [];
    set1 = [];
    set2 = [];
  };

  const addMove = (player, index) => {
    board.push({ player, index });
    if (player == "1") {
      set1.push(index);
      console.log("set1:", set1);
    } else {
      set2.push(index);
      console.log("set2:", set2);
    }
    console.log(`current board:`, board);
    checkGame();
  };

  function checkGame() {
    // check the board for a winner
    console.log(`checking the game for a winner`);
    let win = false;
    winningLines.forEach((win) => {
      if (
        set1.includes(win[0], 0) &&
        set1.includes(win[1], 0) &&
        set1.includes(win[2], 0)
      ) {
        console.log("winner player 1");
        win=true;
        return; //end game here
      }
      if(win) return;
    });
    winningLines.forEach((win) => {
      if (
        set2.includes(win[0]) &&
        set2.includes(win[1]) &&
        set2.includes(win[2])
      ) {
        console.log("winner player 2");
        win=true;
        return; //end game here
      }
      if(win) return;
    });
    //if end of game - draw
    if(set2.length+set1.length==9) console.log('game draw');
  }

  return {
    resetGame,
    addMove,
  };
})();

const DisplayController = (function () {
  //Generates the tiles
  function generateGrid() {
    let container = document.getElementsByClassName("container")[0];
    for (let i = 0; i < 9; i++) {
      let tile = document.createElement("div");
      tile.className = "cell";
      tile.setAttribute("key", i);
      container.appendChild(tile);
    }
  }

  function loadButtons() {
    document.querySelectorAll(".cell").forEach((item) => {
      item.addEventListener("click", function test(event) {
        Game.PlayerMove(event.target);
        item.removeEventListener("click", test);
      });
    });
  }

  const init = () => {
    generateGrid();
    loadButtons();
  };

  return { init };
})();

const Player = (name) => {
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
    player1 = Player("test p1"),
    player2 = Player("test p2")
  ) {
    Gameboard.resetGame();
  };

  const PlayerMove = function (cell) {
    let index = cell.getAttribute("key");
    if (turn == 1) {
      cell.className = cell.className + " x";
      cell.innerText = "X";
      turn = 2;
      Gameboard.addMove("1", index);
    } else {
      cell.className = cell.className + " o";
      cell.innerText = "O";
      turn = 1;
      Gameboard.addMove("2", index);
    }
  };

  return { newGame, PlayerMove };
})();

//
let p1 = Player("player1");
let p2 = Player("player2");

let turn = 1;

//
Game.newGame(p1, p2);

DisplayController.init();
