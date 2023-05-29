import { Dispatch } from "react";
import { buildBaseGrid, cellGrid } from "../cellGrid";
import { IBuildMergedGridProps } from "./IMergedGrid"
import { isGridBottomCollisions, handleGridBottomCollision } from "./gridBottomCollisions"
import { IScoreAction } from "../reducerHooks/score";
import { FixedShapesActionType, IFixedShapesAction } from "../reducerHooks/fixedShapes";
import { ITickAction, TickType } from "../reducerHooks/tick";
import { IShapeAction, ShapeActionType } from "../reducerHooks/liveShape";



describe("isGridBottomCollisions", () => {

    let mergeProps: IBuildMergedGridProps;
    let baseGrid: cellGrid;
    let mockFixedShapesDispatch: Dispatch<IFixedShapesAction>;
    let mocktickDispatch: Dispatch<ITickAction>;
    let mockliveShapeDispatch: Dispatch<IShapeAction>;
    let mockscoreDispatch: Dispatch<IScoreAction>;

    beforeEach(() => {
        mockFixedShapesDispatch = jest.fn()
        mocktickDispatch = jest.fn()
        mockliveShapeDispatch = jest.fn()
        mockscoreDispatch = jest.fn()
        mergeProps = {
            liveShape: {
                rotatingCoordinates: [[{ x: 1, y: 1 }]],
                rotationIndex: 0,
            },
            shapex: 0,
            shapey: 0,
            staticGrid: buildBaseGrid(),
            fixedShapesDispatch: mockFixedShapesDispatch,
            tickDispatch: mocktickDispatch,
            liveShapeDispatch: mockliveShapeDispatch,
            scoreDispatch: mockscoreDispatch
        }
        baseGrid = buildBaseGrid()
    })

    test("Should just return false if liveShape not yet defined", () => {
        mergeProps.liveShape = undefined
        const response = isGridBottomCollisions({ mergeProps, baseGrid });
        expect(response).toEqual(false)
    })

    test("Should return false if collision will not occur", () => {
        const response = isGridBottomCollisions({ mergeProps, baseGrid });
        expect(response).toEqual(false)
    })
    test("Should return true if collision will occur", () => {
        mergeProps.shapey = 18
        const response = isGridBottomCollisions({ mergeProps, baseGrid });
        expect(response).toEqual(true)
    })

})

describe("handleGridBottomCollisions", () => {
    let mergeProps: IBuildMergedGridProps;
    let mockFixedShapesDispatch: Dispatch<IFixedShapesAction>;
    let mocktickDispatch: Dispatch<ITickAction>;
    let mockliveShapeDispatch: Dispatch<IShapeAction>;
    let mockscoreDispatch: Dispatch<IScoreAction>;

    beforeEach(() => {
        mockFixedShapesDispatch = jest.fn()
        mocktickDispatch = jest.fn()
        mockliveShapeDispatch = jest.fn()
        mockscoreDispatch = jest.fn()
        mergeProps = {
            liveShape: {
                rotatingCoordinates: [[{ x: 1, y: 1 }]],
                rotationIndex: 0,
            },
            shapex: 0,
            shapey: 0,
            staticGrid: buildBaseGrid(),
            fixedShapesDispatch: mockFixedShapesDispatch,
            tickDispatch: mocktickDispatch,
            liveShapeDispatch: mockliveShapeDispatch,
            scoreDispatch: mockscoreDispatch
        }
    })

    test("Should call fixedShapeDispatch with correct parameters", () => {
        handleGridBottomCollision(mergeProps);
        expect(mockFixedShapesDispatch).toHaveBeenCalledWith({
            type: FixedShapesActionType.add,
            payload: {
                shape: mergeProps.liveShape,
                x: mergeProps.shapex,
                y: mergeProps.shapey,
                scoreDispatch: mockscoreDispatch,
            }
        })
    })

    test("Should call tickDispatch with correct parameters", () => {
        handleGridBottomCollision(mergeProps);
        expect(mocktickDispatch).toHaveBeenCalledWith({
            type: TickType.reset,
        })
    })

    test("Should call liveShapeDispatch with correct parameters", () => {
        handleGridBottomCollision(mergeProps);
        expect(mockliveShapeDispatch).toHaveBeenCalledWith({
            type: ShapeActionType.randomise,
        })
    })
})