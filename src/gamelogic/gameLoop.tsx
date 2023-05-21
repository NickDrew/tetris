import { Dispatch, useEffect, useReducer, useState } from "react"
import { buildliveGrid, cellGrid } from "./liveGrid"
import { IShape, randomShape, rotateShape } from "./shapeFactory"

enum TickType {
    tick
}
interface ITickAction {
    type: TickType
}
const tickReducer = (state: number, action: ITickAction): number => {
    switch (action.type) {
        case TickType.tick:
            if (state > 17) {
                return 2
            }
            else {
                return state + 1
            }
    }
}

enum ShapeActionType {
    rotate
}

interface IRotateAction {
    type: ShapeActionType
}

const shapeReducer = (state: IShape, action: IRotateAction): IShape => {
    switch (action.type) {
        case ShapeActionType.rotate:
            return rotateShape(state)
    }
}



export interface IUseGameLoopProps {
    gridSetter: Dispatch<cellGrid>
    tickRate: number
}

export const useGameLoop = (props: IUseGameLoopProps) => {
    const { gridSetter, tickRate } = props
    const initialTick = 2
    const initialXOffset = 4
    const initalShape = randomShape()

    //Game tick
    const [tick, tickDispatch] = useReducer(tickReducer, initialTick);
    useEffect(() => {
        setInterval(() => {
            tickDispatch({ type: TickType.tick })
        }, tickRate)
    }, [])

    //Active shape
    const [shape, shapeDispatch] = useReducer(shapeReducer, initalShape)

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
                console.log('Up')
                shapeDispatch({ type: ShapeActionType.rotate })
                return state
            default:
                return state
        }
    }
    const [xoffset, xoffsetDispatch] = useReducer(keyReducer, initialXOffset)
    function onKeyDown(event: React.KeyboardEvent) {
        xoffsetDispatch(event)
    }


    //The actual game loop
    useEffect(() => {
        gridSetter(buildliveGrid({ shapey: tick, shapex: xoffset, shape }).nextGrid)
    }, [tick, xoffset, shape])


    return [onKeyDown]
}