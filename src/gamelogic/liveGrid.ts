
import { Dispatch } from "react"
import { IShape } from "./shapeFactory"
import { cellGrid } from "./cellGrid"
import { FixedShapesActionType } from "./reducerHooks/fixedShapes"
import { TickType } from "./reducerHooks/tick"
import { ShapeActionType } from "./reducerHooks/liveShape"


export interface IBuildLiveGridProps {
    liveShape?: IShape
    shapex: number
    shapey: number
    fixedShapes: cellGrid
    fixedShapesDispatch: Dispatch<any>
    tickDispatch: Dispatch<any>
    liveShapeDispatch:Dispatch<any>
}

export interface ILiveGrid {
    //Next grid to paint
    nextGrid: cellGrid
}


export const buildliveGrid = (props: IBuildLiveGridProps): ILiveGrid => {
    const { shapey, shapex, liveShape, fixedShapes, fixedShapesDispatch,tickDispatch,liveShapeDispatch } = props;
    const baseGrid = buildBaseGrid()

    fixedShapes.forEach((row, y) => {
        row.forEach((cell, x) => {
            baseGrid[y][x] = cell
        })
    })
    console.log(shapey+liveShape!.baseOffset)
    console.log(baseGrid.length)
    if((shapey+liveShape!.baseOffset)>=baseGrid.length-1)
    {
        fixedShapesDispatch({type:FixedShapesActionType.add,payload:{
            shape: liveShape,
            x:shapex,
            y:shapey
        }})
        tickDispatch({type:TickType.reset})
        liveShapeDispatch({type:ShapeActionType.randomise})
    }
    if (shapey < baseGrid.length && liveShape) {
        liveShape.coordinates.forEach((coordinate) => {
            
            if (baseGrid[shapey + coordinate.y] != undefined && baseGrid[shapey + coordinate.y][shapex + coordinate.x] != undefined)
                baseGrid[shapey + coordinate.y][shapex + coordinate.x] = 3
        })
    }

    return { nextGrid: baseGrid }
}

export const buildBaseGrid = (): cellGrid => {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
    ]
}