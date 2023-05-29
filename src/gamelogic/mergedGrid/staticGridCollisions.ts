import { Dispatch } from "react";
import { cellGrid } from "../cellGrid";
import { FixedShapesActionType, IFixedShapesAction } from "../reducerHooks/fixedShapes";
import { IShapeAction, ShapeActionType } from "../reducerHooks/liveShape";
import { ITickAction, TickType } from "../reducerHooks/tick";
import { IShape } from "../shapeFactory";
import { IBuildMergedGridProps } from "./IMergedGrid";
import { IScoreAction } from "../reducerHooks/score";

export interface IIsStaticGridCollisionProps {
    shapey: number,
    shapex: number,
    liveShape?: IShape,
    staticGrid: cellGrid,
}

export const isStaticGridCollision = (props: IIsStaticGridCollisionProps) => {
    const { shapey, shapex, liveShape, staticGrid } = props;
    let collisionDetected = false
    if (liveShape) {
        liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
            if (staticGrid[shapey + coordinate.y] != undefined && staticGrid[shapey + coordinate.y][shapex + coordinate.x] != undefined) {
                if (staticGrid[shapey + coordinate.y][shapex + coordinate.x] != 0) {
                    collisionDetected = true
                }
            }
        })
    }
    return collisionDetected;
}

export interface IHandleStaticGridCollisionProps {
    shapey: number,
    shapex: number,
    liveShape?: IShape,
    fixedShapesDispatch: Dispatch<IFixedShapesAction>,
    tickDispatch: Dispatch<ITickAction>,
    liveShapeDispatch: Dispatch<IShapeAction>,
    scoreDispatch: Dispatch<IScoreAction>,
}
export const handleStaticGridCollision = (props: IHandleStaticGridCollisionProps) => {
    const { shapey, shapex, liveShape, fixedShapesDispatch, tickDispatch, liveShapeDispatch, scoreDispatch } = props;
    fixedShapesDispatch({
        type: FixedShapesActionType.add, payload: {
            shape: liveShape!,
            x: shapex,
            y: shapey - 1,
            scoreDispatch
        }
    })
    tickDispatch({ type: TickType.reset })
    liveShapeDispatch({ type: ShapeActionType.randomise })
}
