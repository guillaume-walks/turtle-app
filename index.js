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
    const {
      grid,
      startPosition,
      exitPosition,
      minesPositions
    } = settings
    this.grid = grid
    this.currentPos = startPosition
    this.exitPos = this.flattenCoordinates(exitPosition)
    this.mines = this.flattenCoordinates(minesPositions)
    this.moves = moves
    this.direction = 0
    this.messages = []
  }
  transfromCoord(coord) {
    return `${coord.x},${coord.y}`
  }
  /**
   * `
   * @param {Array} coordinates - array of coordinates {x:2, y:23}
   * @returns {Object} with position as hash value e.g ['2,23']: 1
   */
  flattenCoordinates(coordinates) {
    const hash = []
    for (const i in coordinates) {
      const value = this.transfromCoord(coordinates[i])
      hash[value] = 1
    }
    return hash
  }
  findCoordinates(coordToFind, list) {
    return !!list[coordToFind]
  }
  start() {
    while (this.moves.length) {
      const nextStep = this.moves.shift()
      const action = this.getAction(nextStep)
      action()
      const isOutOfBound = this.isOutOfBound(this.currentPos, this.grid)
      if (isOutOfBound) {
        this.messages.push('is out of boundary box')
        break
      }
      const flatCurrentPos = this.flattenCoordinates(this.currentPos)
      const hitMine = this.findCoordinates(flatCurrentPos, this.mines)
      if (hitMine) {
        this.messages.push('hit a mine')
        break
      }
      if (!this.moves.length) {
        const exitFound = this.findCoordinates(flatCurrentPos, this.exitPos)
        exitFound && this.messages.push('exit found')
        break
      }
    }
  }
  isOutOfBound(position, grid) {
    const xValid = position.x >= grid.x && position.x <= grid.x
    const yValid = position.y >= grid.y && position.y <= grid.y
    return xValid && yValid
  }

  getAction(type) {
    return type === 'r' ? this.rotate.bind(this) : this.move.bind(this);
  }

  rotate() {
    this.direction += 90;
    if (this.direction === 360) { this.direction = 0 }
  }
  move() {
    const nextPos = this.getNextPos(this.direction)
    this.currentPos = this.setNewPos(nextPos, this.currentPos)
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
}

const g = new Game(settings[0], moves[0])
console.log(g.start())


class GridObject {
  constructor(posX, posY) {
    this.x = posX
    this.y = posY
  }
}
