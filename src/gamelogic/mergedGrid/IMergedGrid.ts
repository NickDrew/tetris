import { type Dispatch } from 'react'
import { type cellGrid } from '../cellGrid'
import { type IShape } from '../shapeFactory'
import { type IScoreAction } from '../reducerHooks/score'
import { type IFixedShapesAction } from '../reducerHooks/fixedShapes'
import { type ITickAction } from '../reducerHooks/tick'
import { type IShapeAction } from '../reducerHooks/liveShape'

export interface IBuildMergedGridProps {
  liveShape?: IShape
  shapex: number
  shapey: number
  staticGrid: cellGrid
  fixedShapesDispatch: Dispatch<IFixedShapesAction>
  tickDispatch: Dispatch<ITickAction>
  liveShapeDispatch: Dispatch<IShapeAction>
  scoreDispatch: Dispatch<IScoreAction>
}
