import { Dispatch } from "react"
import { cellGrid } from "../cellGrid"
import { IShape } from "../shapeFactory"
import { IScoreAction } from "../reducerHooks/score"
import { IFixedShapesAction } from "../reducerHooks/fixedShapes"
import { ITickAction } from "../reducerHooks/tick"
import { IShapeAction } from "../reducerHooks/liveShape"

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