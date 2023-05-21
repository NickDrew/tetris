import { IShape, randomShape, rotateShape } from "../shapeFactory"

export enum ShapeActionType {
    rotate,
    randomise
}

export interface IShapeAction {
    type: ShapeActionType
}

export const shapeReducer = (state: IShape, action: IShapeAction): IShape => {
    switch (action.type) {
        case ShapeActionType.rotate:
            return rotateShape(state)
        case ShapeActionType.randomise:
            return randomShape();
    }
}
