import { type Dispatch, useEffect, useReducer } from 'react'
import { buildMergedGrid } from '../mergedGrid/mergedGrid'
import { randomShape } from '../shapeFactory'
import { buildBaseGrid, type cellGrid } from '../cellGrid'
import { fixedShapeReducer } from '../reducerHooks/fixedShapes'
import { TickType, tickReducer } from '../reducerHooks/tick'
import { shapeReducer } from '../reducerHooks/liveShape'
import { type IScoreAction } from '../reducerHooks/score'
import { keyReducer } from '../reducerHooks/keyReducer'

export interface IUseGameLoopProps {
  gridSetter: Dispatch<cellGrid>
  scoreDispatch: Dispatch<IScoreAction>
  tickRate: number
}

export type onKeyDownFunc = (event: React.KeyboardEvent) => void

export const useGameLoop = (props: IUseGameLoopProps): [onKeyDownFunc] => {
  const { gridSetter, tickRate, scoreDispatch } = props
  const initialTick = 0
  const initialXOffset = 4

  const initalShape = randomShape()
  const initialFixedShapes = buildBaseGrid()

  // Game tick
  const [tick, tickDispatch] = useReducer(tickReducer, initialTick)
  useEffect(() => {
    setInterval(() => {
      tickDispatch({ type: TickType.tick })
    }, tickRate)
  }, [])

  // The live shape controlled by the player
  const [liveShape, liveShapeDispatch] = useReducer(shapeReducer, initalShape)

  // The fixed shapes locked in place after bottom contact
  const [fixedShapes, fixedShapesDispatch] = useReducer(fixedShapeReducer, initialFixedShapes)

  // Player interaction
  const [xoffset, xoffsetDispatch] = useReducer(keyReducer, initialXOffset)
  function onKeyDown (event: React.KeyboardEvent): void {
    xoffsetDispatch({
      event,
      payload: {
        liveShape,
        liveShapeDispatch,
        shapey: tick,
        tickDispatch,
        fixedShapes
      }
    })
  }
  // Build the grid
  useEffect(() => {
    gridSetter(buildMergedGrid({ shapey: tick, shapex: xoffset, liveShape, liveShapeDispatch, staticGrid: fixedShapes, fixedShapesDispatch, tickDispatch, scoreDispatch }))
  }, [tick, xoffset, liveShape, fixedShapes])

  return [onKeyDown]
}
