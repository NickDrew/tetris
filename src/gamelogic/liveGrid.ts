
import { Dispatch } from "react"
import { IShape } from "./shapeFactory"
import { cellGrid } from "./cellGrid"
import { FixedShapesActionType } from "./reducerHooks/fixedShapes"
import { TickType } from "./reducerHooks/tick"
import { ShapeActionType } from "./reducerHooks/liveShape"


export interface IBuildMergedGridProps {
    liveShape?: IShape
    shapex: number
    shapey: number
    staticGrid: cellGrid
    fixedShapesDispatch: Dispatch<any>
    tickDispatch: Dispatch<any>
    liveShapeDispatch:Dispatch<any>
}

const isGridBottomCollisions= (props:{mergeProps:IBuildMergedGridProps, baseGrid:cellGrid}):boolean =>{
    const { mergeProps:{shapey, shapex, liveShape, fixedShapesDispatch,tickDispatch,liveShapeDispatch}, baseGrid } = props;
    let collisionDetected = false;
    if((shapey+liveShape!.baseOffset)>=baseGrid.length-1)
    {
        fixedShapesDispatch({type:FixedShapesActionType.add,payload:{
            shape: liveShape,
            x:shapex,
            y:shapey
        }})
        tickDispatch({type:TickType.reset})
        liveShapeDispatch({type:ShapeActionType.randomise})
        collisionDetected = true;
    }
    return collisionDetected
}

const isStaticGridCollisios = (props:{mergeProps:IBuildMergedGridProps, baseGrid:cellGrid}) =>{
    const { mergeProps:{shapey, shapex, liveShape, fixedShapesDispatch,tickDispatch,liveShapeDispatch}, baseGrid } = props;
    let collisionDetected=false
    if(liveShape)
    {
        liveShape.coordinates.forEach((coordinate) => {
                
            if (baseGrid[shapey + coordinate.y] != undefined && baseGrid[shapey + coordinate.y][shapex + coordinate.x] != undefined)
            {
                if(baseGrid[shapey + coordinate.y][shapex + coordinate.x] !=0)
                {
                    fixedShapesDispatch({type:FixedShapesActionType.add,payload:{
                        shape: liveShape,
                        x:shapex,
                        y:shapey-1
                    }})
                    tickDispatch({type:TickType.reset})
                    liveShapeDispatch({type:ShapeActionType.randomise})
                    collisionDetected = true
                }
            }
                
        })
    }
    return collisionDetected;
}


export const buildMergedGrid = (props: IBuildMergedGridProps): cellGrid => {
    const { shapey, shapex, liveShape, staticGrid } = props;
    const baseGrid = buildBaseGrid()

    //Merge static shapes into the base grid
    staticGrid.forEach((row, y) => {
        row.forEach((cell, x) => {
            baseGrid[y][x] = cell
        })
    })
    
    //Collision checking
    let collisionDetected = isGridBottomCollisions({mergeProps:props,baseGrid})
    if (shapey < baseGrid.length && !collisionDetected) {
       collisionDetected = isStaticGridCollisios({mergeProps:props, baseGrid})
    }
    
    
    if (shapey < baseGrid.length && liveShape &&!collisionDetected) {
        //If no collision, merge live shape onto the base grid
        liveShape.coordinates.forEach((coordinate) => {
            
            if (baseGrid[shapey + coordinate.y] != undefined && baseGrid[shapey + coordinate.y][shapex + coordinate.x] != undefined)
                baseGrid[shapey + coordinate.y][shapex + coordinate.x] = 1
        })
    }

    return baseGrid 
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