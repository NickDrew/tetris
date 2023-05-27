import { cellGrid } from "../cellGrid"
import { IShape } from "../shapeFactory"

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
    }
}
const buildBaseRow = () => {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

export const fixedShapeReducer = (state: cellGrid, action: IFixedShapesAction): cellGrid => {
    const { type, payload: { shape, x, y, rotationIndex } } = action
    switch (type) {
        case FixedShapesActionType.add:
            console.log("add")
            shape.roatatingCoordinates[rotationIndex].forEach((coord) => {
                console.log(coord)
                console.log(y)
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
    }
    return state
}