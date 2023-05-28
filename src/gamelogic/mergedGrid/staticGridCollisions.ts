import { cellGrid } from "../cellGrid";
import { FixedShapesActionType } from "../reducerHooks/fixedShapes";
import { ShapeActionType } from "../reducerHooks/liveShape";
import { TickType } from "../reducerHooks/tick";
import { IBuildMergedGridProps } from "./IMergedGrid";

export const isStaticGridCollision = (props: { mergeProps: IBuildMergedGridProps, baseGrid: cellGrid }) => {
    const { mergeProps: { shapey, shapex, liveShape }, baseGrid } = props;
    let collisionDetected = false
    if (liveShape) {
        liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
            if (baseGrid[shapey + coordinate.y] != undefined && baseGrid[shapey + coordinate.y][shapex + coordinate.x] != undefined) {
                if (baseGrid[shapey + coordinate.y][shapex + coordinate.x] != 0) {
                    collisionDetected = true
                }
            }
        })
    }
    return collisionDetected;
}

export const handleStaticGridCollision = (props: IBuildMergedGridProps) => {
    const { shapey, shapex, liveShape, fixedShapesDispatch, tickDispatch, liveShapeDispatch, scoreDispatch: scoreDespatch } = props;
    fixedShapesDispatch({
        type: FixedShapesActionType.add, payload: {
            shape: liveShape!,
            x: shapex,
            y: shapey - 1,
            scoreDespatch
        }
    })
    tickDispatch({ type: TickType.reset })
    liveShapeDispatch({ type: ShapeActionType.randomise })
}
