import { IShape, rotateShape, randomShape } from '../shapeFactory';
import { shapeReducer, IShapeAction, ShapeActionType } from './liveShape';

jest.mock("../shapeFactory", () => ({
    rotateShape: jest.fn().mockReturnValue({
        coordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]],
        rotationIndex: 1,
        baseOffset: 0,
    }),
    randomShape: jest.fn().mockReturnValue({
        coordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]],
        rotationIndex: 0,
        baseOffset: 0,
    })
}));


describe('shapeReducer', () => {
    let initialState: IShape;

    beforeEach(() => {
        initialState = {
            rotatingCoordinates: [],
            rotationIndex: 0,
            baseOffset: 0
        };
    });

    test('should rotate the shape', () => {
        const action: IShapeAction = {
            type: ShapeActionType.rotate
        };

        const newState = shapeReducer(initialState, action);

        expect(rotateShape).toHaveBeenCalledWith(initialState);
        expect(newState).toEqual({
            coordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]],
            rotationIndex: 1,
            baseOffset: 0
        });
    });

    test('should randomize the shape', () => {
        const action: IShapeAction = {
            type: ShapeActionType.randomise
        };


        const newState = shapeReducer(initialState, action);

        expect(randomShape).toHaveBeenCalled();
        expect(newState).toEqual({
            coordinates: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]],
            rotationIndex: 0,
            baseOffset: 0
        });
    });
});
