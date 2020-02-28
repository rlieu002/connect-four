import React, { Component } from "react";
import * as cf from "../utils";
import logo from "../../../assets/logo.svg";
import { CONSTS } from "../../../constants";

export default class Game extends Component {
  constructor() {
    super();

    const gameState = JSON.parse(JSON.stringify(CONSTS.newGameState));
    this.state = {
      gameState,
      mode: "1",
      winner: null
    };

    this.onClickMove = this.onClickMove.bind(this);
    this.onClickRestart = this.onClickRestart.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
  }

  renderTable() {
    const { gameState } = this.state;
    const tableRows = gameState.map((row, rowIndex) => {
      const columns = row.map((column, columnIndex) => {
        let style = {};
        if (column === "y") {
          style = styles.yellowPlayer;
        } else if (column === "r") {
          style = styles.redPlayer;
        }

        return (
          <td key={columnIndex} style={styles.cell}>
            <div style={style}></div>
          </td>
        );
      });

      return <tr key={rowIndex}>{columns}</tr>;
    });

    const buttonRow = CONSTS.buttonRow.map(button => (
      <td key={button} style={styles.cell}>
        <button
          style={styles.moveButton}
          onClick={this.onClickMove}
          value={button}
        ></button>
      </td>
    ));

    return (
      <table border="1">
        {tableRows}
        <tr>{buttonRow}</tr>
      </table>
    );
  }

  toggleMode(e) {
    const mode = e.target.value;
    this.setState({ mode });
  }

  onClickMove(e) {
    const move = Number(e.target.value);
    const { gameState, winner, mode } = this.state;
    if (!winner) {
      const color = cf.getCurrentPlayer(gameState);
      const newGameState = cf.play(gameState, move, color);
      if (cf.isStateValid(newGameState)) {
        this.setState(
          {
            gameState: newGameState
          },
          () => {
            let winner = cf.winner(newGameState);
            if (winner) {
              winner = color === "y" ? "yellow" : "red";
              this.setState({ winner });
            } else if (mode === "1") {
              this.computerMove();
            }
          }
        );
      } else {
        console.error("invalid game state");
      }
    }
  }

  onClickRestart() {
    const gameState = JSON.parse(JSON.stringify(CONSTS.newGameState));
    this.setState({
      gameState,
      winner: null
    });
  }

  computerMove() {
    const { gameState } = this.state;
    const color = "r";
    const move = cf.figureNextMove(gameState, color);
    const newGameState = cf.play(gameState, move, color);
    if (cf.isStateValid(newGameState)) {
      this.setState(
        {
          gameState: newGameState
        },
        () => {
          let winner = cf.winner(newGameState);
          if (winner) {
            winner = color === "y" ? "yellow" : "red";
            this.setState({ winner });
          }
        }
      );
    } else {
      console.error("invalid game state");
    }
  }

  render() {
    const { winner } = this.state;
    const button1 =
      this.state.mode === "1" ? styles.activeButton : styles.button;
    const button2 =
      this.state.mode === "2" ? styles.activeButton : styles.button;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" width="100px" />
          {winner && <h1>{winner} wins!</h1>}
          <div style={styles.modeContainer}>
            <button style={button1} onClick={this.toggleMode} value="1">
              1 Player
            </button>
            <button style={button2} onClick={this.toggleMode} value="2">
              2 Players
            </button>
          </div>
          {this.renderTable()}
          <button style={styles.button} onClick={this.onClickRestart}>
            Restart
          </button>
        </header>
      </div>
    );
  }
}

const styles = {
  yellowPlayer: {
    borderRadius: "25px",
    backgroundColor: "yellow",
    width: "40px",
    height: "40px",
    margin: "auto"
  },
  redPlayer: {
    borderRadius: "25px",
    backgroundColor: "red",
    width: "40px",
    height: "40px",
    margin: "auto"
  },
  cell: {
    width: "50px",
    height: "50px"
  },
  moveButton: {
    width: "40px",
    height: "40px"
  },
  button: {
    width: "120px",
    height: "40px",
    margin: "10px",
    cursor: "pointer"
  },
  activeButton: {
    width: "120px",
    height: "40px",
    margin: "10px",
    cursor: "pointer",
    backgroundColor: "grey"
  },
  modeContainer: {
    display: "flex",
    justifyContent: "flex-end"
  }
};
