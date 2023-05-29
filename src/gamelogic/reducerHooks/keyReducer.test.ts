import { type Dispatch } from 'react'
import { type IKeyAction, keyReducer } from './keyReducer'
import { type IShapeAction } from './liveShape'
import { type ITickAction } from './tick'
import { buildBaseGrid } from '../cellGrid'
import * as collisionChecks from '../gameLoop/horizontalCollision'

describe('keyReducer', () => {
  let props: IKeyAction
  let event: any
  let mockliveShapeDispatch: Dispatch<IShapeAction>
  let mocktickDispatch: Dispatch<ITickAction>
  let mockpreventDefault: any
  let mockisCollisionRight: any
  let mockisCollisionLeft: any
  beforeEach(() => {
    mockliveShapeDispatch = jest.fn().mockImplementation(() => { })
    mocktickDispatch = jest.fn().mockImplementation(() => { })
    mockpreventDefault = jest.fn().mockImplementation(() => { })
    mockisCollisionRight = jest.spyOn(collisionChecks, 'isCollisionRight').mockImplementation(() => false)
    mockisCollisionLeft = jest.spyOn(collisionChecks, 'isCollisionLeft').mockImplementation(() => false)
    event = {
      key: 'ArrowRight',
      preventDefault: mockpreventDefault
    }
    props = {
      event,
      payload: {
        liveShape: {
          rotatingCoordinates: [[{ x: 1, y: 1 }]],
          rotationIndex: 0
        },
        fixedShapes: buildBaseGrid(),
        shapey: 0,
        liveShapeDispatch: mockliveShapeDispatch,
        tickDispatch: mocktickDispatch
      }
    }
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('For arrow right with no collision, catches the event and returns an increment', () => {
    const response = keyReducer(1, props)

    expect(mockpreventDefault).toBeCalled()
    expect(mockisCollisionRight).toBeCalled()
    expect(response).toEqual(2)
  })

  test('For arrow right with collision, catches the event and returns no increment', () => {
    mockisCollisionRight = jest.spyOn(collisionChecks, 'isCollisionRight').mockImplementation(() => true)

    const response = keyReducer(1, props)

    expect(mockpreventDefault).toBeCalled()
    expect(mockisCollisionRight).toBeCalled()
    expect(response).toEqual(1)
  })

  test('For arrow left with no collision, catches the event and returns an decrement', () => {
    props.event.key = 'ArrowLeft'
    const response = keyReducer(1, props)

    expect(mockpreventDefault).toBeCalled()
    expect(mockisCollisionLeft).toBeCalled()
    expect(response).toEqual(0)
  })

  test('For arrow left with collision, catches the event and returns no decrement', () => {
    mockisCollisionLeft = jest.spyOn(collisionChecks, 'isCollisionLeft').mockImplementation(() => true)
    props.event.key = 'ArrowLeft'
    const response = keyReducer(1, props)

    expect(mockpreventDefault).toBeCalled()
    expect(mockisCollisionLeft).toBeCalled()
    expect(response).toEqual(1)
  })

  test('For arrow down, catches the event and calls tick dispatcher', () => {
    props.event.key = 'ArrowDown'
    const response = keyReducer(1, props)

    expect(mockpreventDefault).toBeCalled()
    expect(mocktickDispatch).toBeCalled()
    expect(response).toEqual(1)
  })

  test('For arrow up, catches the event and calls liveShape dispatcher', () => {
    props.event.key = 'ArrowUp'
    const response = keyReducer(1, props)

    expect(mockpreventDefault).toBeCalled()
    expect(mockliveShapeDispatch).toBeCalled()
    expect(response).toEqual(1)
  })
})
