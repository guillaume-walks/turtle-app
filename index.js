/**
 * Requirements:
 * Here is my understanding of the exercices, I'll try to summarize the requirements and define the 
 * the specs based on this. 
 * 
 * @Inputs - {settings}
 *  - 2 different files to be read: 
 *    - game settings
 *    - sequence of move 
 * 
 *  Game settings: 
 *    - grid dimension n x m tiles {BoardSize}
 *    - start position
 *    - exit position
 *    - list of mine positions
 *    e.g. 
 *    {
 *      grid : { x: 5, y: 10 },
 *      startPosition: { x: 1, y: 2 },
 *      exitPosition: { x: 3, y: 4 },,
 *      minesPositions: [
 *        { x: 1, y: 2 },
 *        { x: 14, y: 5 },
 *        { x: 6, y: 4 }
 *      ]
 *    }
 *  Files of moves
 *    - list of moves, (m or r)
 *    e.g. [Array] = [ 'r', 'm', 'm', 'r']... 
 * 
 * If the position brings out of the map... I will return false anyway Out of bound
 * 
 */

const settings = require('./config/settings.json')
const moves = require('./config/moves.json')

class Game {
  constructor(settings, moves) {
    this.grid = settings.grid
    this.currentPos = settings.startPosition
    this.exitPos = settings.exitPosition
    this.mines = settings.minesPositions
    this.moves = moves
    this.direction = 0
    this.messages = []
  }

  start() {
    while (this.moves.length) {
      const nextStep = this.moves.shift()
      const action = this.getAction(nextStep)
      action()
    }
  }

  getAction(type) {
    return type === 'r' ? this.rotate.bind(this) : this.move.bind(this);
  }

  rotate() {
    this.direction += 90;
    if (this.direction === 360) { this.direction = 0 }
    console.log('rotate', this.direction)
  }
  move() {
    console.log('move')
    // const newPostion = this.moveTo(this.direction)
    const nextPos = this.getNextPos(this.direction)
    console.log(this.currentPos)
    this.currentPos = this.setNewPos(nextPos, this.currentPos)
    console.log(this.currentPos)
  }

  setNewPos(newPos, oldPos) {
    return {
      x: oldPos.x + newPos.x,
      y: oldPos.y + newPos.y
    }
  }
  getNextPos(direction) {
    let pos = { x: 0, y: 0 }
    switch (direction) {
      case 0:
        pos.x = -1
        break;
      case 90:
        pos.y = 1
        break;
      case 180:
        pos.x = 1
        break;
      case 270:
        pos.y = -1
        break;

      default:
        break;
    }
    return pos
  }
  // moveTo
}

const g = new Game(settings[0], moves[0])
console.log(g.start())


class GridObject {
  constructor(posX, posY) {
    this.x = posX
    this.y = posY
  }
}
