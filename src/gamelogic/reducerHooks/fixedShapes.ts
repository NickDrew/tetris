import { cellGrid } from "../cellGrid"
import { IShape } from "../shapeFactory"

export enum FixedShapesActionType {
    add
}

export interface IFixedShapesAction {
    type: FixedShapesActionType,
    payload: {
        shape: IShape,
        x: number,
        y: number,
    }
}

export const fixedShapeReducer = (state: cellGrid, action: IFixedShapesAction): cellGrid => {
    const { type, payload: { shape, x, y } } = action
    switch (type) {
        case FixedShapesActionType.add:
            shape.coordinates.forEach((coord) => {
                state[y + coord.y][x + coord.x] = 7
            })
    }
    return state
}