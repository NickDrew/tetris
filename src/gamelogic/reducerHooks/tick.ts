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
            if (tick > 17) {
                return 2
            }
            else {
                return tick + 1
            }
        case TickType.reset:
            return 0
    }
}