import { Dispatch, useEffect, useReducer, useState } from "react"
import { buildliveGrid, cellGrid } from "./liveGrid"

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

export interface IUseGameLoopProps {
    gridSetter: Dispatch<cellGrid>
    tickRate: number
}

export const useGameLoop = (props: IUseGameLoopProps) => {
    const { gridSetter, tickRate } = props
    const initialTick = 0

    //Using a reducer to get around re-paint closure issues
    const [tick, dispatch] = useReducer(tickReducer, initialTick);
    useEffect(() => {
        setInterval(() => {
            dispatch({ type: TickType.tick })
        }, tickRate)
    }, [])

    //The actual game loop
    useEffect(() => {
        gridSetter(buildliveGrid({ shapey: tick }).nextGrid)
    }, [tick])
}