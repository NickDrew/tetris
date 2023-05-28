import { Dispatch } from "react"
import { cellGrid } from "../cellGrid"
import { IShape } from "../shapeFactory"
import { IScoreAction } from "../reducerHooks/score"

export interface IBuildMergedGridProps {
    liveShape?: IShape
    shapex: number
    shapey: number
    staticGrid: cellGrid
    fixedShapesDispatch: Dispatch<any>
    tickDispatch: Dispatch<any>
    liveShapeDispatch: Dispatch<any>
    scoreDespatch: Dispatch<IScoreAction>
}