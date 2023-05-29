import { type cellGrid } from '../cellGrid'
import { type IShape } from '../shapeFactory'

export interface IIsCollisionProps {
  liveShape: IShape
  fixedShapes: cellGrid
  shapey: number
  shapex: number
}

export const isCollisionRight = (props: IIsCollisionProps): boolean => {
  const { liveShape, fixedShapes, shapex, shapey } = props
  let collisionDetected = false

  liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
    if (shapex + coordinate.x >= fixedShapes[0].length) {
      collisionDetected = true
    }
  })
  if (!collisionDetected) {
    liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
      if (fixedShapes[shapey + coordinate.y] !== undefined && fixedShapes[shapey + coordinate.y][shapex + coordinate.x] !== undefined) {
        if (fixedShapes[shapey + coordinate.y][shapex + coordinate.x + 1] !== 0) {
          collisionDetected = true
        }
      }
    })
  }

  return collisionDetected
}

export const isCollisionLeft = (props: IIsCollisionProps): boolean => {
  const { liveShape, fixedShapes, shapex, shapey } = props
  let collisionDetected = false

  liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
    if (shapex + coordinate.x === 0) {
      collisionDetected = true
    }
  })
  if (!collisionDetected) {
    liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
      if (fixedShapes[shapey + coordinate.y] !== undefined && fixedShapes[shapey + coordinate.y][shapex + coordinate.x] !== undefined) {
        if (fixedShapes[shapey + coordinate.y][shapex + coordinate.x - 1] !== 0) {
          collisionDetected = true
        }
      }
    })
  }

  return collisionDetected
}
