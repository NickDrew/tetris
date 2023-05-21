import { Dispatch, useEffect, useReducer } from "react"
import { buildBaseGrid, buildliveGrid } from "./liveGrid"
import {  randomShape, } from "./shapeFactory"
import { cellGrid } from "./cellGrid"
import { fixedShapeReducer } from "./reducerHooks/fixedShapes"
import { TickType, tickReducer } from "./reducerHooks/tick"
import {shapeReducer,ShapeActionType} from "./reducerHooks/liveShape"


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

    //Active shape
    const [liveShape, liveShapeDispatch] = useReducer(shapeReducer, initalShape)

    //Fixed shapes
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
        gridSetter(buildliveGrid({ shapey: tick, shapex: xoffset,  liveShape,liveShapeDispatch, fixedShapes, fixedShapesDispatch,tickDispatch }).nextGrid)
    }, [tick, xoffset, liveShape,fixedShapes])


    return [onKeyDown]
}