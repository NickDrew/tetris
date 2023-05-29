import { type cellGrid } from '../cellGrid'
import { FixedShapesActionType } from '../reducerHooks/fixedShapes'
import { ShapeActionType } from '../reducerHooks/liveShape'
import { TickType } from '../reducerHooks/tick'
import { type IBuildMergedGridProps } from './IMergedGrid'

export const isGridBottomCollisions = (props: { mergeProps: IBuildMergedGridProps, baseGrid: cellGrid }): boolean => {
  const { mergeProps: { shapey, liveShape }, baseGrid } = props
  let collisionDetected = false
  if (liveShape != null) {
    liveShape.rotatingCoordinates[liveShape.rotationIndex].forEach((coordinate) => {
      if (shapey + coordinate.y >= baseGrid.length - 1) {
        collisionDetected = true
      }
    })
  }
  return collisionDetected
}

export const handleGridBottomCollision = (props: IBuildMergedGridProps): void => {
  const { shapey, shapex, liveShape, fixedShapesDispatch, tickDispatch, liveShapeDispatch, scoreDispatch } = props
  if (liveShape !== undefined) {
    fixedShapesDispatch({
      type: FixedShapesActionType.add,
      payload: {
        shape: liveShape,
        x: shapex,
        y: shapey,
        scoreDispatch
      }
    })
    tickDispatch({ type: TickType.reset })
    liveShapeDispatch({ type: ShapeActionType.randomise })
  }
}
