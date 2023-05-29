import { type IShape, rotateShape, randomShape } from '../shapeFactory'
import { shapeReducer, type IShapeAction, ShapeActionType } from './liveShape'

jest.mock('../shapeFactory', () => ({
  rotateShape: jest.fn().mockReturnValue({
    coordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]],
    rotationIndex: 1
  }),
  randomShape: jest.fn().mockReturnValue({
    coordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]],
    rotationIndex: 0
  })
}))

describe('shapeReducer', () => {
  let initialState: IShape

  beforeEach(() => {
    initialState = {
      rotatingCoordinates: [],
      rotationIndex: 0
    }
  })

  test('should rotate the shape', () => {
    const action: IShapeAction = {
      type: ShapeActionType.rotate
    }

    const newState = shapeReducer(initialState, action)

    expect(rotateShape).toHaveBeenCalledWith(initialState)
    expect(newState).toEqual({
      coordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]],
      rotationIndex: 1
    })
  })

  test('should randomize the shape', () => {
    const action: IShapeAction = {
      type: ShapeActionType.randomise
    }

    const newState = shapeReducer(initialState, action)

    expect(randomShape).toHaveBeenCalled()
    expect(newState).toEqual({
      coordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]],
      rotationIndex: 0
    })
  })
})
