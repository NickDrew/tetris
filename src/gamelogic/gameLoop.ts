import { Dispatch, useEffect, useReducer } from "react"
import { buildMergedGrid } from "./mergedGrid/mergedGrid"
import { IShape, randomShape, } from "./shapeFactory"
import { buildBaseGrid, cellGrid } from "./cellGrid"
import { fixedShapeReducer } from "./reducerHooks/fixedShapes"
import { TickType, tickReducer } from "./reducerHooks/tick"
import { shapeReducer, ShapeActionType } from "./reducerHooks/liveShape"
import { IScoreAction } from "./reducerHooks/score"


export interface IUseGameLoopProps {
    gridSetter: Dispatch<cellGrid>
    scoreDespatch: Dispatch<IScoreAction>
    tickRate: number
}

interface IIsCollisionProps {
    liveShape: IShape,
    fixedShapes: cellGrid,
    shapey: number,
    shapex: number
}

const isCollisionRight = (props: IIsCollisionProps): boolean => {
    const { liveShape, fixedShapes, shapex, shapey } = props;
    let collisionDetected = false
    if (liveShape) {
        liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
            if (shapex + coordinate.x >= fixedShapes[0].length) {
                collisionDetected = true
            }

        })
        if (!collisionDetected) {
            liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
                if (fixedShapes[shapey + coordinate.y] != undefined && fixedShapes[shapey + coordinate.y][shapex + coordinate.x] != undefined) {
                    if (fixedShapes[shapey + coordinate.y][shapex + coordinate.x + 1] != 0) {
                        collisionDetected = true
                    }
                }
            })
        }
    }
    return collisionDetected;
}

const isCollisionLeft = (props: IIsCollisionProps): boolean => {
    const { liveShape, fixedShapes, shapex, shapey } = props;
    let collisionDetected = false
    if (liveShape) {
        liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
            if (shapex + coordinate.x == 0) {
                collisionDetected = true
            }

        })
        if (!collisionDetected) {
            liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
                if (fixedShapes[shapey + coordinate.y] != undefined && fixedShapes[shapey + coordinate.y][shapex + coordinate.x] != undefined) {
                    if (fixedShapes[shapey + coordinate.y][shapex + coordinate.x - 1] != 0) {
                        collisionDetected = true
                    }
                }
            })
        }
    }
    return collisionDetected;
}

export const useGameLoop = (props: IUseGameLoopProps) => {
    const { gridSetter, tickRate, scoreDespatch } = props
    const initialTick = 0
    const initialXOffset = 4

    const initalShape = randomShape()
    const initialFixedShapes = buildBaseGrid()

    //Game tick
    const [tick, tickDispatch] = useReducer(tickReducer, initialTick);
    useEffect(() => {
        setInterval(() => {
            tickDispatch({ type: TickType.tick })
        }, tickRate)

    }, [])

    //The live shape controlled by the player
    const [liveShape, liveShapeDispatch] = useReducer(shapeReducer, initalShape)

    //The fixed shapes locked in place after bottom contact
    const [fixedShapes, fixedShapesDispatch] = useReducer(fixedShapeReducer, initialFixedShapes)

    //Player interaction
    const keyReducer = (state: number, action: React.KeyboardEvent): number => {
        switch (action.key) {
            case 'ArrowRight':
                action.preventDefault();
                return isCollisionRight({ liveShape, fixedShapes, shapex: state, shapey: tick }) ? state : state + 1
            case 'ArrowLeft':
                action.preventDefault();
                return isCollisionLeft({ liveShape, fixedShapes, shapex: state, shapey: tick }) ? state : state - 1
            case 'ArrowUp':
                action.preventDefault();
                liveShapeDispatch({ type: ShapeActionType.rotate })
                return state
            case 'ArrowDown':
                action.preventDefault();
                tickDispatch({ type: TickType.tick })
                return state;
            default:
                return state
        }
    }
    const [xoffset, xoffsetDispatch] = useReducer(keyReducer, initialXOffset)
    function onKeyDown(event: React.KeyboardEvent) {
        xoffsetDispatch(event)
    }


    //Build the grid
    useEffect(() => {
        gridSetter(buildMergedGrid({ shapey: tick, shapex: xoffset, liveShape, liveShapeDispatch, staticGrid: fixedShapes, fixedShapesDispatch, tickDispatch, scoreDespatch }))
    }, [tick, xoffset, liveShape, fixedShapes])


    return [onKeyDown]
}