import { type cellGrid } from '../cellGrid'
import { isCollisionLeft, isCollisionRight } from '../horizontalCollision'
import { type IShape, randomShape, rotateShape } from '../shapeFactory'

export enum ShapeActionType {
  rotate,
  randomise
}

export interface IShapeAction {
  type: ShapeActionType
  payload?: {
    fixedShapes: cellGrid
    shapex: number
    shapey: number
  }
}

export const shapeReducer = (state: IShape, action: IShapeAction): IShape => {
  const { payload } = action
  let shape = randomShape()
  switch (action.type) {
    case ShapeActionType.rotate:
      shape = rotateShape(state)
      if (payload !== undefined &&
        (!isCollisionRight({ ...payload, liveShape: shape, shapex: payload.shapex - 1 }) &&
        !isCollisionLeft({ ...payload, liveShape: shape, shapex: payload.shapex + 1 }))) {
        return rotateShape(state)
      } else {
        return state
      }
    case ShapeActionType.randomise:
      shape.rotationIndex = 0
      return shape
  }
}
