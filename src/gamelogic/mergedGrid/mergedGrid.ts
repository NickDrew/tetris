
import { buildBaseGrid, cellGrid } from "../cellGrid"
import { IBuildMergedGridProps } from "./IMergedGrid"
import { handleGridBottomCollision, isGridBottomCollisions } from "./gridBottomCollisions"
import { handleStaticGridCollision, isStaticGridCollision } from "./staticGridCollisions"

export const buildMergedGrid = (props: IBuildMergedGridProps): cellGrid => {
    const { shapey, shapex, liveShape, staticGrid } = props;
    const baseGrid = buildBaseGrid()

    //Merge static shapes into the base grid
    staticGrid.forEach((row, y) => {
        row.forEach((cell, x) => {
            baseGrid[y][x] = cell
        })
    })

    //Collision checking
    if (isStaticGridCollision({ mergeProps: props, baseGrid })) {
        handleStaticGridCollision(props,)
    }
    else {
        if (isGridBottomCollisions({ mergeProps: props, baseGrid })) {
            handleGridBottomCollision(props);
        }
        else {
            if (liveShape) {
                //If no collision, merge live shape in new position with the base grid
                liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
                    if (baseGrid[shapey + coordinate.y] != undefined && baseGrid[shapey + coordinate.y][shapex + coordinate.x] != undefined)
                        baseGrid[shapey + coordinate.y][shapex + coordinate.x] = 1
                })
            }
        }
    }
    return baseGrid
}

