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

const Footer = () => (
  <footer>
    <div>Designed and developed my me.</div>
  </footer>
);

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

const GameGridContent = ({ setWinner }) => {
  const [gameData, setGameData] = React.useState([{}, {}, {}, {}, {}, {}, {}, {}, {}]);
  return gameData.map((cell, idx) => (
    <div
      key={idx}
      className="gameGridCell"
      onClick={() => {
        console.log('Clicked', idx);
        setWinner('user');
      }}
    >
      <div className="cellContent">{cell.value ? cell.value : '-'}</div>
    </div>
  ));
  };

const Game = () => {
  const [score, setScore] = React.useState({ user: 0, player: 0 });
  return (
    <div>
      <Scoreboard score={score} />
      <div className="gameGridContainer">
        <GameGridContent
          setWinner={(p) => {
            console.log(p, 'is the winner');
          }}
        />
      </div>
    </div>
  );
  };

const TicTacGame = () => (
  <div className="mainContainer">
    <Header />
    <Game />
    <Footer />
  </div>
);

// Render the game on the page
ReactDOM.render(<TicTacGame />, document.querySelector('#reactContainer'));
