import { type IShape, randomShape, rotateShape } from '../shapeFactory'

export enum ShapeActionType {
  rotate,
  randomise
}

export interface IShapeAction {
  type: ShapeActionType
}

export const shapeReducer = (state: IShape, action: IShapeAction): IShape => {
  const shape = randomShape()
  switch (action.type) {
    case ShapeActionType.rotate:
      return rotateShape(state)
    case ShapeActionType.randomise:
      shape.rotationIndex = 0
      return shape
  }
}
