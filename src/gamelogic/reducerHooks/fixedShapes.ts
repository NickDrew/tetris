import { Dispatch } from "react"
import { cellGrid } from "../cellGrid"
import { IShape } from "../shapeFactory"
import { IScoreAction, ScoreActionType } from "./score"

export enum FixedShapesActionType {
    add
}

export interface IFixedShapesAction {
    type: FixedShapesActionType,
    payload: {
        shape: IShape,
        rotationIndex: number
        x: number,
        y: number,
        scoreDespatch: Dispatch<IScoreAction>
    }
}
const buildBaseRow = () => {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

export const fixedShapeReducer = (state: cellGrid, action: IFixedShapesAction): cellGrid => {
    const { type, payload: { shape, x, y, rotationIndex, scoreDespatch } } = action
    switch (type) {
        case FixedShapesActionType.add:
            shape.roatatingCoordinates[rotationIndex].forEach((coord) => {
                state[y + coord.y][x + coord.x] = 2
            })
            //Check for entire completed rows
            let fullRowCount = 0
            state = state.filter((row) => {
                let fullRow = true
                row.forEach((cell) => {
                    if (cell == 0) {
                        fullRow = false
                    }
                })
                if (fullRow) {
                    fullRowCount++
                }
                return !fullRow
            })
            //Replace any removed rows
            for (let i = 0; i < fullRowCount; i++) {
                state.unshift(buildBaseRow())
            }
            switch (fullRowCount) {
                case 0:
                    //no points
                    break;
                case 1:
                    scoreDespatch({ type: ScoreActionType.add, payload: { amount: 100 } })
                    break;
                case 2:
                    scoreDespatch({ type: ScoreActionType.add, payload: { amount: 300 } })
                    break;
                case 3:
                    scoreDespatch({ type: ScoreActionType.add, payload: { amount: 500 } })
                    break;
                case 4:
                    scoreDespatch({ type: ScoreActionType.add, payload: { amount: 800 } })
                    break;
            }
    }
    return state
}