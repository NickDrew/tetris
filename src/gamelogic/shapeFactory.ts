export interface ICoordinate {
    x: number;
    y: number;
}
export interface IShape {
    roatatingCoordinates: ICoordinate[][]
    roatationIndex: 0
    baseOffset: number
}


const Shapes: IShape[] = [

    {
        //Line piece
        roatatingCoordinates: [
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
        roatationIndex: 0,
        baseOffset: 1
    },
    {
        //L piece
        roatatingCoordinates: [
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
        roatationIndex: 0,
        baseOffset: 0
    },
    {
        //Reverse L piece
        roatatingCoordinates: [
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
        roatationIndex: 0,
        baseOffset: 0
    },
    {
        //Square piece
        roatatingCoordinates: [
            [
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
        ],
        roatationIndex: 0,
        baseOffset: 0
    },
    {
        //Z piece
        roatatingCoordinates: [
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
        roatationIndex: 0,
        baseOffset: 0
    },
    {
        //Reverse Z piece
        roatatingCoordinates: [
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
        roatationIndex: 0,
        baseOffset: 0
    },
    {
        //T piece
        roatatingCoordinates: [
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
        roatationIndex: 0,
        baseOffset: 0
    },
];

export function randomShape(): IShape {
    return Shapes[Math.floor(Math.random() * Shapes.length)];
}

export function rotateShape(shape: IShape): IShape {
    shape.roatationIndex++;
    if (shape.roatationIndex >= shape.roatatingCoordinates.length) shape.roatationIndex = 0;
    return shape;
    // const newShape: IShape = { coordinates: [], roatatingCoordinates: [], roatationIndex: 0, baseOffset: 0 }
    // let biggestOffset = 0
    // shape.coordinates.forEach((cord, index) => {
    //     newShape.coordinates.push({ x: -cord.y, y: cord.x });
    //     biggestOffset = cord.x > biggestOffset ? cord.x : biggestOffset;
    // })
    // newShape.baseOffset = biggestOffset
    // return newShape
}