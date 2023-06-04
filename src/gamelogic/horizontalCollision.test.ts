import { buildBaseGrid } from './cellGrid'
import { type IIsCollisionProps, isCollisionLeft, isCollisionRight } from './horizontalCollision'

describe('isCollisionLeft', () => {
  let props: IIsCollisionProps
  beforeEach(() => {
    props = {
      liveShape: {
        rotatingCoordinates: [[{ x: 0, y: 0 }]],
        rotationIndex: 0
      },
      fixedShapes: buildBaseGrid(),
      shapex: 0,
      shapey: 0
    }
  })
  test('Detects a left collision due to grid edge', () => {
    expect(isCollisionLeft(props)).toEqual(true)
  })
  test('Detects a left collision due to static shape', () => {
    props.liveShape.rotatingCoordinates[0][0].x = 1
    props.fixedShapes[0][0] = 1
    expect(isCollisionLeft(props)).toEqual(true)
  })
  test('Correctly identifies a lack of collision', () => {
    props.shapex = 1
    expect(isCollisionLeft(props)).toEqual(false)
  })
})

describe('isCollisionRight', () => {
  let props: IIsCollisionProps
  beforeEach(() => {
    props = {
      liveShape: {
        rotatingCoordinates: [[{ x: 1, y: 0 }]],
        rotationIndex: 0
      },
      fixedShapes: buildBaseGrid(),
      shapex: 8,
      shapey: 0
    }
  })
  test('Detects a right collision due to grid edge', () => {
    expect(isCollisionRight(props)).toEqual(true)
  })
  test('Detects a right collision due to static shape', () => {
    props.shapex = 7
    props.fixedShapes[0][9] = 1
    expect(isCollisionRight(props)).toEqual(true)
  })
  test('Correctly identifies a lack of collision', () => {
    props.shapex = 1
    expect(isCollisionRight(props)).toEqual(false)
  })
})
