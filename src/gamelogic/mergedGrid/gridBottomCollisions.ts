import { cellGrid } from "../cellGrid";
import { FixedShapesActionType } from "../reducerHooks/fixedShapes";
import { ShapeActionType } from "../reducerHooks/liveShape";
import { TickType } from "../reducerHooks/tick";
import { IBuildMergedGridProps } from "./IMergedGrid";

export const isGridBottomCollisions = (props: { mergeProps: IBuildMergedGridProps, baseGrid: cellGrid }): boolean => {
    const { mergeProps: { shapey, shapex, liveShape, }, baseGrid } = props;
    let collisionDetected = false;
    if (liveShape) {
        liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
            if (shapey + coordinate.y >= baseGrid.length - 1) {
                collisionDetected = true
            }

        })
    }
    return collisionDetected;
}

export const handleGridBottomCollision = (props: IBuildMergedGridProps) => {
    const { shapey, shapex, liveShape, fixedShapesDispatch, tickDispatch, liveShapeDispatch, scoreDespatch } = props;
    fixedShapesDispatch({
        type: FixedShapesActionType.add, payload: {
            shape: liveShape,
            x: shapex,
            y: shapey,
            scoreDespatch
        }
    })
    tickDispatch({ type: TickType.reset })
    liveShapeDispatch({ type: ShapeActionType.randomise })
}