import React, { Dispatch } from "react";
import { IShape } from "../shapeFactory";
import { cellGrid } from "../cellGrid";
import { IShapeAction, ShapeActionType } from "./liveShape";
import { ITickAction, TickType } from "./tick";
import { isCollisionLeft, isCollisionRight } from "../gameLoop/horizontalCollision";

export interface IKeyAction {
    event: React.KeyboardEvent
    payload: {
        liveShape: IShape,
        fixedShapes: cellGrid,
        shapey: number
        liveShapeDispatch: Dispatch<IShapeAction>,
        tickDispatch: Dispatch<ITickAction>
    }
}



export const keyReducer = (state: number, action: IKeyAction): number => {
    const { event, payload: { liveShape, fixedShapes, shapey, liveShapeDispatch, tickDispatch } } = action
    switch (event.key) {
        case 'ArrowRight':
            event.preventDefault();
            return isCollisionRight({ liveShape, fixedShapes, shapex: state, shapey }) ? state : state + 1
        case 'ArrowLeft':
            event.preventDefault();
            return isCollisionLeft({ liveShape, fixedShapes, shapex: state, shapey }) ? state : state - 1
        case 'ArrowUp':
            event.preventDefault();
            liveShapeDispatch({ type: ShapeActionType.rotate })
            return state
        case 'ArrowDown':
            event.preventDefault();
            tickDispatch({ type: TickType.tick })
            return state;
        default:
            return state
    }
}