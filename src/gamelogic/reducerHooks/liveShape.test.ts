import { type IShape, rotateShape, randomShape } from '../shapeFactory'
import { shapeReducer, type IShapeAction, ShapeActionType } from './liveShape'
import * as collisionChecks from '../horizontalCollision'
import { buildBaseGrid } from '../cellGrid'

jest.mock('../shapeFactory', () => ({
  rotateShape: jest.fn().mockReturnValue({
    rotatingCoordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]],
    rotationIndex: 1
  }),
  randomShape: jest.fn().mockReturnValue({
    rotatingCoordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]],
    rotationIndex: 0
  })
}))

describe('shapeReducer', () => {
  let initialState: IShape
  let action: IShapeAction
  let mockisCollisionRight: any
  let mockisCollisionLeft: any
  beforeEach(() => {
    mockisCollisionLeft = jest.spyOn(collisionChecks, 'isCollisionLeft').mockImplementation(() => false)
    mockisCollisionRight = jest.spyOn(collisionChecks, 'isCollisionRight').mockImplementation(() => false)

    initialState = {
      rotatingCoordinates: [],
      rotationIndex: 0
    }
    action = {
      type: ShapeActionType.rotate,
      payload: {
        shapex: 0,
        shapey: 1,
        fixedShapes: buildBaseGrid()
      }
    }
  })

  test('should rotate the shape when will not result in collision', () => {
    const newState = shapeReducer(initialState, action)

    expect(rotateShape).toHaveBeenCalledWith(initialState)
    expect(mockisCollisionLeft).toHaveBeenCalled()
    expect(mockisCollisionRight).toHaveBeenCalled()
    expect(newState).toEqual({
      rotatingCoordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]],
      rotationIndex: 1
    })
  })

  test('should not rotate the shape when will result in left collision', () => {
    mockisCollisionLeft = jest.spyOn(collisionChecks, 'isCollisionLeft').mockImplementation(() => true)
    const newState = shapeReducer(initialState, action)

    expect(rotateShape).toHaveBeenCalledWith(initialState)
    expect(mockisCollisionLeft).toHaveBeenCalled()
    expect(mockisCollisionRight).toHaveBeenCalled()
    expect(newState).toEqual({
      rotatingCoordinates: [],
      rotationIndex: 0
    })
  })

  test('should not rotate the shape when will result in right collision', () => {
    mockisCollisionRight = jest.spyOn(collisionChecks, 'isCollisionRight').mockImplementation(() => true)
    const newState = shapeReducer(initialState, action)

    expect(rotateShape).toHaveBeenCalledWith(initialState)
    expect(mockisCollisionLeft).toHaveBeenCalled()
    expect(mockisCollisionRight).toHaveBeenCalled()
    expect(newState).toEqual({
      rotatingCoordinates: [],
      rotationIndex: 0
    })
  })

  test('should randomize the shape', () => {
    const action: IShapeAction = {
      type: ShapeActionType.randomise
    }

    const newState = shapeReducer(initialState, action)

    expect(randomShape).toHaveBeenCalled()
    expect(newState).toEqual({
      rotatingCoordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]],
      rotationIndex: 0
    })
  })
})
