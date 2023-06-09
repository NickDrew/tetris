import { type Dispatch } from 'react'
import { buildBaseGrid } from '../cellGrid'
import { type IBuildMergedGridProps } from './IMergedGrid'
import { isStaticGridCollision, handleStaticGridCollision, type IIsStaticGridCollisionProps } from './staticGridCollisions'
import { type IScoreAction } from '../reducerHooks/score'
import { FixedShapesActionType, type IFixedShapesAction } from '../reducerHooks/fixedShapes'
import { type ITickAction, TickType } from '../reducerHooks/tick'
import { type IShapeAction, ShapeActionType } from '../reducerHooks/liveShape'

describe('isStaticGridCollision', () => {
  let props: IIsStaticGridCollisionProps

  beforeEach(() => {
    props = {
      liveShape: {
        rotatingCoordinates: [[{ x: 1, y: 1 }]],
        rotationIndex: 0
      },
      shapex: 0,
      shapey: 16,
      staticGrid: buildBaseGrid()
    }
    props.staticGrid[17] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  })

  test('Should just return false if liveShape not yet defined', () => {
    props.liveShape = undefined
    const response = isStaticGridCollision(props)
    expect(response).toEqual(false)
  })

  test('Should just return false if live shape is out of bounds', () => {
    props.shapey = 18
    const response = isStaticGridCollision(props)
    expect(response).toEqual(false)
  })
  test('Should return true if collision will occur', () => {
    const response = isStaticGridCollision(props)
    expect(response).toEqual(true)
  })
})

describe('handleGridBottomCollisions', () => {
  let mergeProps: IBuildMergedGridProps
  let mockFixedShapesDispatch: Dispatch<IFixedShapesAction>
  let mocktickDispatch: Dispatch<ITickAction>
  let mockliveShapeDispatch: Dispatch<IShapeAction>
  let mockscoreDispatch: Dispatch<IScoreAction>

  beforeEach(() => {
    mockFixedShapesDispatch = jest.fn()
    mocktickDispatch = jest.fn()
    mockliveShapeDispatch = jest.fn()
    mockscoreDispatch = jest.fn()
    mergeProps = {
      liveShape: {
        rotatingCoordinates: [[{ x: 1, y: 1 }]],
        rotationIndex: 0
      },
      shapex: 0,
      shapey: 0,
      staticGrid: buildBaseGrid(),
      fixedShapesDispatch: mockFixedShapesDispatch,
      tickDispatch: mocktickDispatch,
      liveShapeDispatch: mockliveShapeDispatch,
      scoreDispatch: mockscoreDispatch
    }
  })

  test('Should call fixedShapeDispatch with correct parameters', () => {
    handleStaticGridCollision(mergeProps)
    expect(mockFixedShapesDispatch).toHaveBeenCalledWith({
      type: FixedShapesActionType.add,
      payload: {
        shape: mergeProps.liveShape,
        x: mergeProps.shapex,
        y: mergeProps.shapey - 1,
        scoreDispatch: mockscoreDispatch
      }
    })
  })

  test('Should call tickDispatch with correct parameters', () => {
    handleStaticGridCollision(mergeProps)
    expect(mocktickDispatch).toHaveBeenCalledWith({
      type: TickType.reset
    })
  })

  test('Should call liveShapeDispatch with correct parameters', () => {
    handleStaticGridCollision(mergeProps)
    expect(mockliveShapeDispatch).toHaveBeenCalledWith({
      type: ShapeActionType.randomise
    })
  })
})
