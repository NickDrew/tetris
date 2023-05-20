export interface ICoordinate {
    x: number;
    y: number;
}
export interface IShape {
    coordinates: [ICoordinate, ICoordinate, ICoordinate, ICoordinate]
    width: number;
    height: number
}


const Shapes: IShape[] = [
    {
        coordinates: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: 1 }
        ],
        width: 2,
        height: 2,
    },
    {
        coordinates: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 }
        ],
        width: 1,
        height: 4
    },
    {
        coordinates: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 }
        ],
        width: 1,
        height: 3
    }
];

export function randomShape(): IShape {
    return Shapes[Math.floor(Math.random() * Shapes.length)];
}