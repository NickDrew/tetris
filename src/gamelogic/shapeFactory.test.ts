import { IShape, randomShape, rotateShape, Shapes } from "./shapeFactory"


describe("randomShape", () => {
    beforeEach(() => {
        //Lets have no random in the tests!
        jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    });
    test("Should generate a shape 'randomly'", () => {
        expect(randomShape()).toEqual(
            {
                "baseOffset": 1,
                "rotatingCoordinates": [
                    [
                        { x: 0, y: -2 },
                        { x: 0, y: -1 },
                        { x: 0, y: 0 },
                        { x: 0, y: 1 }
                    ],
                    [
                        { x: -1, y: 0 },
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 2, y: 0 }
                    ],
                    [
                        { x: -1, y: -2 },
                        { x: -1, y: -1 },
                        { x: -1, y: 0 },
                        { x: -1, y: 1 }
                    ],
                    [
                        { x: -1, y: -1 },
                        { x: 0, y: -1 },
                        { x: 1, y: -1 },
                        { x: 2, y: -1 }
                    ],
                ],
                "rotationIndex": 0,
            }
        )
    })
})

describe("rotateShape", () => {
    test("Should rotate a shape correctly", () => {
        const shape: IShape = { rotatingCoordinates: [[], [], []], rotationIndex: 0, baseOffset: 0 }
        expect(rotateShape(shape).rotationIndex).toEqual(1);
    })
    test("Should rotate a shape with its index at the end of its coordinate array correctly", () => {
        const shape: IShape = { rotatingCoordinates: [[], [], []], rotationIndex: 2, baseOffset: 0 }

        expect(rotateShape(shape).rotationIndex).toEqual(0);
    })
})

describe("Shapes", () => {
    test("Should define shapes in expected format", () => {
        expect(Shapes).toMatchInlineSnapshot(`
[
  {
    "baseOffset": 1,
    "rotatingCoordinates": [
      [
        {
          "x": 0,
          "y": -2,
        },
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 0,
          "y": 1,
        },
      ],
      [
        {
          "x": -1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": 0,
        },
        {
          "x": 2,
          "y": 0,
        },
      ],
      [
        {
          "x": -1,
          "y": -2,
        },
        {
          "x": -1,
          "y": -1,
        },
        {
          "x": -1,
          "y": 0,
        },
        {
          "x": -1,
          "y": 1,
        },
      ],
      [
        {
          "x": -1,
          "y": -1,
        },
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": 1,
          "y": -1,
        },
        {
          "x": 2,
          "y": -1,
        },
      ],
    ],
    "rotationIndex": 0,
  },
  {
    "baseOffset": 0,
    "rotatingCoordinates": [
      [
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 0,
          "y": 1,
        },
        {
          "x": -1,
          "y": 1,
        },
      ],
      [
        {
          "x": -1,
          "y": -1,
        },
        {
          "x": -1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": 0,
        },
      ],
      [
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": 1,
          "y": -1,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 0,
          "y": 1,
        },
      ],
      [
        {
          "x": -1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": 0,
        },
        {
          "x": 1,
          "y": 1,
        },
      ],
    ],
    "rotationIndex": 0,
  },
  {
    "baseOffset": 0,
    "rotatingCoordinates": [
      [
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 0,
          "y": 1,
        },
        {
          "x": 1,
          "y": 1,
        },
      ],
      [
        {
          "x": -1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": 0,
        },
        {
          "x": -1,
          "y": 1,
        },
      ],
      [
        {
          "x": -1,
          "y": -1,
        },
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 0,
          "y": 1,
        },
      ],
      [
        {
          "x": -1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": 0,
        },
        {
          "x": 1,
          "y": -1,
        },
      ],
    ],
    "rotationIndex": 0,
  },
  {
    "baseOffset": 0,
    "rotatingCoordinates": [
      [
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": -1,
        },
        {
          "x": 1,
          "y": 0,
        },
      ],
    ],
    "rotationIndex": 0,
  },
  {
    "baseOffset": 0,
    "rotatingCoordinates": [
      [
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": 0,
        },
        {
          "x": -1,
          "y": 1,
        },
        {
          "x": 0,
          "y": 1,
        },
      ],
      [
        {
          "x": -1,
          "y": -1,
        },
        {
          "x": -1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 0,
          "y": 1,
        },
      ],
      [
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": 1,
          "y": -1,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": -1,
          "y": 0,
        },
      ],
      [
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": 0,
        },
        {
          "x": 1,
          "y": 1,
        },
      ],
    ],
    "rotationIndex": 0,
  },
  {
    "baseOffset": 0,
    "rotatingCoordinates": [
      [
        {
          "x": -1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 0,
          "y": 1,
        },
        {
          "x": 1,
          "y": 1,
        },
      ],
      [
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": -1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": -1,
          "y": 1,
        },
      ],
      [
        {
          "x": -1,
          "y": -1,
        },
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": 0,
        },
      ],
      [
        {
          "x": 1,
          "y": -1,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 1,
        },
      ],
    ],
    "rotationIndex": 0,
  },
  {
    "baseOffset": 0,
    "rotatingCoordinates": [
      [
        {
          "x": -1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 1,
        },
      ],
      [
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": -1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 0,
          "y": 1,
        },
      ],
      [
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": -1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": 0,
        },
      ],
      [
        {
          "x": 0,
          "y": -1,
        },
        {
          "x": 0,
          "y": 0,
        },
        {
          "x": 1,
          "y": 0,
        },
        {
          "x": 0,
          "y": 1,
        },
      ],
    ],
    "rotationIndex": 0,
  },
]
`)
    })
})