export enum TickType {
    tick,
    reset
}
export interface ITickAction {
    type: TickType
}
export const tickReducer = (tick: number, action: ITickAction): number => {
    switch (action.type) {
        case TickType.tick:
            return tick + 1
        case TickType.reset:
            return 0
    }
}