import { Dispatch, useEffect, useReducer, useState } from "react"
import { buildliveGrid, cellGrid } from "./liveGrid"
import { randomShape } from "./shapeFactory"

enum TickType {
    tick
}
interface ITickAction {
    type: TickType
}
const tickReducer = (state: number, action: ITickAction): number => {
    console.log(state)
    switch (action.type) {
        case TickType.tick:
            return state + 1
    }
}




const keyReducer = (state: number, action: React.KeyboardEvent): number => {
    switch (action.key) {
        case 'ArrowRight':
            action.preventDefault();
            return state + 1
        case 'ArrowLeft':
            action.preventDefault();
            return state - 1
        default:
            break;
    }
}

export interface IUseGameLoopProps {
    gridSetter: Dispatch<cellGrid>
    tickRate: number
}
const shape = randomShape()
export const useGameLoop = (props: IUseGameLoopProps) => {
    const { gridSetter, tickRate } = props
    const initialTick = 0
    const initialXOffset = 0


    //Using reducers to get around re-paint closure issues
    const [tick, tickDispatch] = useReducer(tickReducer, initialTick);
    useEffect(() => {
        setInterval(() => {
            tickDispatch({ type: TickType.tick })
        }, tickRate)
    }, [])
    const [xoffset, xoffsetDispatch] = useReducer(keyReducer, initialXOffset)

    function onKeyDown(event: React.KeyboardEvent) {
        console.log("shabba")
        xoffsetDispatch(event)
    }
    //The actual game loop
    useEffect(() => {
        gridSetter(buildliveGrid({ shapey: tick, shapex: xoffset, shape }).nextGrid)
    }, [tick, xoffset])
    return [onKeyDown]
}