
import { Dispatch } from "react"
import { IShape } from "./shapeFactory"
import { buildBaseGrid, cellGrid } from "./cellGrid"
import { FixedShapesActionType } from "./reducerHooks/fixedShapes"
import { TickType } from "./reducerHooks/tick"
import { ShapeActionType } from "./reducerHooks/liveShape"
import { IScoreAction } from "./reducerHooks/score"


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

const isGridBottomCollisions = (props: { mergeProps: IBuildMergedGridProps, baseGrid: cellGrid }): boolean => {
    const { mergeProps: { shapey, shapex, liveShape, }, baseGrid } = props;
    let collisionDetected = false;
    if (liveShape) {
        liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
            if (shapey + coordinate.y >= baseGrid.length - 1) {
                collisionDetected = true
            }

        })
    }
    return collisionDetected;
}

const handleGridBottomCollision = (props: IBuildMergedGridProps) => {
    const { shapey, shapex, liveShape, fixedShapesDispatch, tickDispatch, liveShapeDispatch, scoreDespatch } = props;
    fixedShapesDispatch({
        type: FixedShapesActionType.add, payload: {
            shape: liveShape,
            x: shapex,
            y: shapey,
            scoreDespatch
        }
    })
    tickDispatch({ type: TickType.reset })
    liveShapeDispatch({ type: ShapeActionType.randomise })
}

const isStaticGridCollision = (props: { mergeProps: IBuildMergedGridProps, baseGrid: cellGrid }) => {
    const { mergeProps: { shapey, shapex, liveShape }, baseGrid } = props;
    let collisionDetected = false
    if (liveShape) {
        liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
            if (baseGrid[shapey + coordinate.y] != undefined && baseGrid[shapey + coordinate.y][shapex + coordinate.x] != undefined) {
                if (baseGrid[shapey + coordinate.y][shapex + coordinate.x] != 0) {
                    collisionDetected = true
                }
            }
        })
    }
    return collisionDetected;
}

const handleStaticGridCollision = (props: IBuildMergedGridProps) => {
    const { shapey, shapex, liveShape, fixedShapesDispatch, tickDispatch, liveShapeDispatch, scoreDespatch } = props;
    fixedShapesDispatch({
        type: FixedShapesActionType.add, payload: {
            shape: liveShape,
            x: shapex,
            y: shapey - 1,
            scoreDespatch
        }
    })
    tickDispatch({ type: TickType.reset })
    liveShapeDispatch({ type: ShapeActionType.randomise })
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

    if (isStaticGridCollision({ mergeProps: props, baseGrid })) {
        handleStaticGridCollision(props,)
    }
    else {
        if (isGridBottomCollisions({ mergeProps: props, baseGrid })) {
            handleGridBottomCollision(props);
        }
        else {
            if (liveShape) {
                //If no collision, merge live shape in new position with the base grid
                liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
                    if (baseGrid[shapey + coordinate.y] != undefined && baseGrid[shapey + coordinate.y][shapex + coordinate.x] != undefined)
                        baseGrid[shapey + coordinate.y][shapex + coordinate.x] = 1
                })
            }
        }
    }



    return baseGrid
}

