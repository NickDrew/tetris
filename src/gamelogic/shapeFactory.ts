export interface ICoordinate {
    x: number;
    y: number;
}
export interface IShape {
    rotatingCoordinates: ICoordinate[][]
    rotationIndex: number;
    baseOffset: number
}


export const Shapes: IShape[] = [

    {
        //Line piece
        rotatingCoordinates: [
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
        rotationIndex: 0,
        baseOffset: 1
    },
    {
        //L piece
        rotatingCoordinates: [
            [
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 1 }
            ],
            [
                { x: -1, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [
                { x: 0, y: -1 },
                { x: 1, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ],
            [
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ],
        ],
        rotationIndex: 0,
        baseOffset: 0
    },
    {
        //Reverse L piece
        rotatingCoordinates: [
            [
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ],
            [
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: -1, y: 1 }
            ],
            [
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ],
            [
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: -1 }
            ],
        ],
        rotationIndex: 0,
        baseOffset: 0
    },
    {
        //Square piece
        rotatingCoordinates: [
            [
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
        ],
        rotationIndex: 0,
        baseOffset: 0
    },
    {
        //Z piece
        rotatingCoordinates: [
            [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: -1, y: 1 },
                { x: 0, y: 1 }
            ],
            [
                { x: -1, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ],
            [
                { x: 0, y: -1 },
                { x: 1, y: -1 },
                { x: 0, y: 0 },
                { x: -1, y: 0 }
            ],
            [
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ],
        ],
        rotationIndex: 0,
        baseOffset: 0
    },
    {
        //Reverse Z piece
        rotatingCoordinates: [
            [
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ],
            [
                { x: 0, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: -1, y: 1 }
            ],
            [
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [
                { x: 1, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 }
            ],
        ],
        rotationIndex: 0,
        baseOffset: 0
    },
    {
        //T piece
        rotatingCoordinates: [
            [
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 }
            ],
            [
                { x: 0, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ],
            [
                { x: 0, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 }
            ],
        ],
        rotationIndex: 0,
        baseOffset: 0
    },
];

export function randomShape(): IShape {
    return Shapes[Math.floor(Math.random() * Shapes.length)];
}

export function rotateShape(shape: IShape): IShape {
    const newShape = {
        ...shape
    }
    newShape.rotationIndex++;
    if (newShape.rotationIndex >= newShape.rotatingCoordinates.length) newShape.rotationIndex = 0;
    return newShape;
}