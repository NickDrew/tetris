import { Dispatch, useEffect, useReducer } from "react"
import { buildBaseGrid, buildMergedGrid } from "./mergedGrid"
import { randomShape, } from "./shapeFactory"
import { cellGrid } from "./cellGrid"
import { fixedShapeReducer } from "./reducerHooks/fixedShapes"
import { TickType, tickReducer } from "./reducerHooks/tick"
import { shapeReducer, ShapeActionType } from "./reducerHooks/liveShape"


export interface IUseGameLoopProps {
    gridSetter: Dispatch<cellGrid>
    tickRate: number
}

export const useGameLoop = (props: IUseGameLoopProps) => {
    const { gridSetter, tickRate } = props
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
                return state + 1
            case 'ArrowLeft':
                action.preventDefault();
                return state - 1
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
        gridSetter(buildMergedGrid({ shapey: tick, shapex: xoffset, liveShape, liveShapeDispatch, staticGrid: fixedShapes, fixedShapesDispatch, tickDispatch }))
    }, [tick, xoffset, liveShape, fixedShapes])


    return [onKeyDown]
}