const Header = () => (
  <header>
    <h1>Welcome to my TicTacGame</h1>
  </header>
);

const Footer = () => (
  <footer>
    <div>Designed and developed my me.</div>
  </footer>
);

const Scoreboard = ({ score }) => (
  <div>
    User: {score.user} Player: {score.player}
  </div>
);

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
