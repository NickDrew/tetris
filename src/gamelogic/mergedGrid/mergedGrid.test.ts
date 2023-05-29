import { type Dispatch } from 'react'
import { buildBaseGrid } from '../cellGrid'
import { type IFixedShapesAction } from '../reducerHooks/fixedShapes'
import { type IBuildMergedGridProps } from './IMergedGrid'
import { buildMergedGrid } from './mergedGrid'
import { type ITickAction } from '../reducerHooks/tick'
import { type IScoreAction } from '../reducerHooks/score'
import { type IShapeAction } from '../reducerHooks/liveShape'
import * as staticGridCollisions from './staticGridCollisions'
import * as bottomCollisions from './gridBottomCollisions'

describe('buildMergedGrid', () => {
  let props: IBuildMergedGridProps
  let mockfixedShapeDispatch: Dispatch<IFixedShapesAction>
  let mocktickDispatch: Dispatch<ITickAction>
  let mockliveShapeDispatch: Dispatch<IShapeAction>
  let mockscoreDispatch: Dispatch<IScoreAction>
  let mockIsStaticGridCollision: any
  let mockHandleStaticGridCollision: any
  let mockIsBottomCollision: any
  let mockHandleBottomCollision: any

  beforeEach(() => {
    mockIsStaticGridCollision = jest.spyOn(staticGridCollisions, 'isStaticGridCollision').mockImplementation(() => false)
    mockHandleStaticGridCollision = jest.spyOn(staticGridCollisions, 'handleStaticGridCollision').mockImplementation(() => { })
    mockIsBottomCollision = jest.spyOn(bottomCollisions, 'isGridBottomCollisions').mockImplementation(() => false)
    mockHandleBottomCollision = jest.spyOn(bottomCollisions, 'handleGridBottomCollision').mockImplementation(() => { })
    mocktickDispatch = jest.fn()
    mockliveShapeDispatch = jest.fn()
    mockscoreDispatch = jest.fn()
    props = {
      shapey: 0,
      shapex: 0,
      liveShape: {
        rotatingCoordinates: [[{ x: 1, y: 1 }]],
        rotationIndex: 0
      },
      staticGrid: buildBaseGrid(),
      fixedShapesDispatch: mockfixedShapeDispatch,
      tickDispatch: mocktickDispatch,
      liveShapeDispatch: mockliveShapeDispatch,
      scoreDispatch: mockscoreDispatch
    }
    props.staticGrid[17][0] = 2
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('Should call isStaticGridCollision', () => {
    buildMergedGrid(props)
    expect(mockIsStaticGridCollision).toBeCalled()
  })
  test('Should call isGridBottomCollision', () => {
    buildMergedGrid(props)
    expect(mockIsBottomCollision).toBeCalled()
  })
  test('Should return merged grid as expected', () => {
    const grid = buildMergedGrid(props)
    expect(grid).toEqual(
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    )
  })
  test('Should return empty grid if no live shape and empty static grid', () => {
    props.liveShape = undefined
    props.staticGrid = buildBaseGrid()
    const grid = buildMergedGrid(props)
    expect(grid).toEqual(
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    )
  })
  test('If there is a static grid collision, should call handleStaticGridCollision only, with no live updates to grid', () => {
    mockIsStaticGridCollision = jest.spyOn(staticGridCollisions, 'isStaticGridCollision').mockImplementation(() => true)
    const grid = buildMergedGrid(props)
    expect(mockHandleStaticGridCollision).toBeCalled()
    expect(mockIsBottomCollision).not.toBeCalled()
    expect(grid).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ])
  })

  test('If there is a bottom collision, should call handleBottomGridCollision, with no live updates to grid', () => {
    mockIsBottomCollision = jest.spyOn(bottomCollisions, 'isGridBottomCollisions').mockImplementation(() => true)
    const grid = buildMergedGrid(props)
    expect(mockHandleBottomCollision).toBeCalled()
    expect(mockHandleStaticGridCollision).not.toBeCalled()
    expect(grid).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ])
  })
})
