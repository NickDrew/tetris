import { type Dispatch } from 'react'
import { type cellGrid } from '../cellGrid'
import { FixedShapesActionType, type IFixedShapesAction } from '../reducerHooks/fixedShapes'
import { type IShapeAction, ShapeActionType } from '../reducerHooks/liveShape'
import { type ITickAction, TickType } from '../reducerHooks/tick'
import { type IShape } from '../shapeFactory'
import { type IScoreAction } from '../reducerHooks/score'

export interface IIsStaticGridCollisionProps {
  shapey: number
  shapex: number
  liveShape?: IShape
  staticGrid: cellGrid
}

export const isStaticGridCollision = (props: IIsStaticGridCollisionProps): boolean => {
  const { shapey, shapex, liveShape, staticGrid } = props
  let collisionDetected = false
  if (liveShape !== undefined) {
    liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
      if (staticGrid[shapey + coordinate.y] !== undefined && staticGrid[shapey + coordinate.y][shapex + coordinate.x] !== undefined) {
        if (staticGrid[shapey + coordinate.y][shapex + coordinate.x] !== 0) {
          collisionDetected = true
        }
      }
    })
  }
  return collisionDetected
}

export interface IHandleStaticGridCollisionProps {
  shapey: number
  shapex: number
  liveShape?: IShape
  fixedShapesDispatch: Dispatch<IFixedShapesAction>
  tickDispatch: Dispatch<ITickAction>
  liveShapeDispatch: Dispatch<IShapeAction>
  scoreDispatch: Dispatch<IScoreAction>
}
export const handleStaticGridCollision = (props: IHandleStaticGridCollisionProps): void => {
  const { shapey, shapex, liveShape, fixedShapesDispatch, tickDispatch, liveShapeDispatch, scoreDispatch } = props
  if (liveShape !== undefined) {
    fixedShapesDispatch({
      type: FixedShapesActionType.add,
      payload: {
        shape: liveShape,
        x: shapex,
        y: shapey - 1,
        scoreDispatch
      }
    })
    tickDispatch({ type: TickType.reset })
    liveShapeDispatch({ type: ShapeActionType.randomise })
  }
}
