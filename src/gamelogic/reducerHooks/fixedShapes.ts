import { type Dispatch } from 'react'
import { buildBaseGrid, type cellGrid } from '../cellGrid'
import { type IShape } from '../shapeFactory'
import { type IScoreAction, ScoreActionType } from './score'

export enum FixedShapesActionType {
  add
}

export interface IFixedShapesAction {
  type: FixedShapesActionType
  payload: {
    shape: IShape
    x: number
    y: number
    scoreDispatch: Dispatch<IScoreAction>
  }
}
export const buildBaseRow = (): number[] => {
  return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

export const fixedShapeReducer = (state: cellGrid, action: IFixedShapesAction): cellGrid => {
  const { type, payload: { shape, x, y, scoreDispatch } } = action
  let topGridHit = false
  switch (type) {
    case FixedShapesActionType.add:
      shape.rotatingCoordinates[shape.rotationIndex].forEach((coord) => {
        if ((y + coord.y) <= -1) {
          topGridHit = true
        } else {
          state[y + coord.y][x + coord.x] = 2
        }
      })
      if (topGridHit) {
        state = buildBaseGrid()
        scoreDispatch({ type: ScoreActionType.set, payload: { amount: 0 } })
      } else {
        // Check for entire completed rows
        let fullRowCount = 0
        state = state.filter((row) => {
          let fullRow = true
          row.forEach((cell) => {
            if (cell === 0) {
              fullRow = false
            }
          })
          if (fullRow) {
            fullRowCount++
          }
          return !fullRow
        })
        // Replace any removed rows
        for (let i = 0; i < fullRowCount; i++) {
          state.unshift(buildBaseRow())
        }
        switch (fullRowCount) {
          case 0:
            // no points
            break
          case 1:
            scoreDispatch({ type: ScoreActionType.add, payload: { amount: 100 } })
            break
          case 2:
            scoreDispatch({ type: ScoreActionType.add, payload: { amount: 300 } })
            break
          case 3:
            scoreDispatch({ type: ScoreActionType.add, payload: { amount: 500 } })
            break
          case 4:
            scoreDispatch({ type: ScoreActionType.add, payload: { amount: 800 } })
            break
        }
      }
  }
  return state
}
