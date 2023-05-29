import { buildBaseGrid, cellGrid } from '../cellGrid';
import { fixedShapeReducer, IFixedShapesAction, FixedShapesActionType } from './fixedShapes'; // Import the module containing the reducer and necessary types
import { ScoreActionType } from './score';

describe('fixedShapeReducer', () => {
    let initialState: cellGrid;
    let scoreDispatchMock: jest.Mock;

    beforeEach(() => {
        initialState = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        scoreDispatchMock = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should add shape when top grid is not hit', () => {
        const action: IFixedShapesAction = {
            type: FixedShapesActionType.add,
            payload: {
                shape: {
                    rotatingCoordinates: [[{ x: 0, y: 0 }, { x: 0, y: 1 }]],
                    rotationIndex: 0,
                },
                x: 0,
                y: 0,

                scoreDispatch: scoreDispatchMock
            }
        };

        const expectedState: cellGrid = [
            [2, 0, 0],
            [2, 0, 0],
            [0, 0, 0]
        ];

        const newState = fixedShapeReducer(initialState, action);

        expect(newState).toEqual(expectedState);
        expect(scoreDispatchMock).not.toBeCalled();
    });

    test('should reset state and score when top grid is hit', () => {
        const action: IFixedShapesAction = {
            type: FixedShapesActionType.add,
            payload: {
                shape: {
                    rotatingCoordinates: [[{ x: 0, y: -1 }, { x: 0, y: 0 }]],
                    rotationIndex: 0,
                },
                x: 0,
                y: 0,
                scoreDispatch: scoreDispatchMock
            }
        };

        const expectedState: cellGrid = buildBaseGrid();

        const newState = fixedShapeReducer(initialState, action);

        expect(newState).toEqual(expectedState);
        expect(scoreDispatchMock).toHaveBeenCalledWith({ type: ScoreActionType.set, payload: { amount: 0 } });
    });

    test('should remove completed rows and add score points', () => {
        initialState = [
            [2, 2, 2],
            [2, 2, 2],
            [0, 0, 0]
        ];

        const action: IFixedShapesAction = {
            type: FixedShapesActionType.add,
            payload: {
                shape: {
                    rotatingCoordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]],
                    rotationIndex: 0,
                },
                x: 0,
                y: 0,
                scoreDispatch: scoreDispatchMock
            }
        };

        const expectedState: cellGrid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0]
        ];

        const newState = fixedShapeReducer(initialState, action);

        expect(newState).toEqual(expectedState);
        expect(scoreDispatchMock).toHaveBeenCalledWith({ type: ScoreActionType.add, payload: { amount: 300 } });
    });
})

