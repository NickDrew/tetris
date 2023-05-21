export interface ICoordinate {
    x: number;
    y: number;
}
export interface IShape {
    coordinates:ICoordinate[]
    baseOffset:number
}


const Shapes: IShape[] = [
    {
        coordinates: [
            { x: 0, y: -2 },
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: 1, y: 0 }
        ],
        baseOffset:0
    },
    {
        coordinates: [
            { x: 0, y: -2 },
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: 0, y: 1 }
        ],
        baseOffset:1
    },
    {
        coordinates: [
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: 1, y: -1 },
            { x: 1, y: 0 }
        ],
        baseOffset:0
    }
];

export function randomShape(): IShape {
    return Shapes[Math.floor(Math.random() * Shapes.length)];
}

export function rotateShape(shape: IShape): IShape {
    const newShape: IShape = {  coordinates: [], baseOffset:0 }
    let biggestOffset = 0
    shape.coordinates.forEach((cord, index) => {
        newShape.coordinates.push({ x: -cord.y, y: cord.x });
        biggestOffset = cord.x>biggestOffset?cord.x:biggestOffset;
    })
    newShape.baseOffset=biggestOffset
    return newShape
}