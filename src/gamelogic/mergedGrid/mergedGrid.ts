
import { buildBaseGrid, type cellGrid } from '../cellGrid'
import { type IBuildMergedGridProps } from './IMergedGrid'
import { handleGridBottomCollision, isGridBottomCollisions } from './gridBottomCollisions'
import { handleStaticGridCollision, isStaticGridCollision } from './staticGridCollisions'

export const buildMergedGrid = (props: IBuildMergedGridProps): cellGrid => {
  const { shapey, shapex, liveShape, staticGrid, fixedShapesDispatch, tickDispatch, liveShapeDispatch, scoreDispatch } = props
  const baseGrid = buildBaseGrid()

  // Merge static shapes into the base grid
  staticGrid.forEach((row, y) => {
    row.forEach((cell, x) => {
      baseGrid[y][x] = cell
    })
  })

  // Collision logic
  if (isStaticGridCollision({ shapex, shapey, liveShape, staticGrid })) {
    handleStaticGridCollision({ shapey, shapex, liveShape, fixedShapesDispatch, tickDispatch, liveShapeDispatch, scoreDispatch })
  } else {
    if (isGridBottomCollisions({ mergeProps: props, baseGrid })) {
      handleGridBottomCollision(props)
    } else {
      if (liveShape != null) {
        // If no collision, merge live shape in new position with the base grid
        liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
          if (baseGrid[shapey + coordinate.y] !== undefined && baseGrid[shapey + coordinate.y][shapex + coordinate.x] !== undefined) { baseGrid[shapey + coordinate.y][shapex + coordinate.x] = 1 }
        })
      }
    }
  }
  return baseGrid
}
