import {
  isValue,
  isHorizontalMatch,
  countHorizontalMatch,
  countVerticalMatch,
  isDiagonalMatch,
  countDiagonalMatch,
  winner
} from "./winner";
import { getCurrentPlayer, isStateValid, play, getRow } from "./play";
import { figureNextMove } from './move';

export {
  isValue,
  isHorizontalMatch,
  countHorizontalMatch,
  countVerticalMatch,
  isDiagonalMatch,
  countDiagonalMatch,
  winner,
  getCurrentPlayer,
  isStateValid,
  play,
  figureNextMove,
  getRow
};
