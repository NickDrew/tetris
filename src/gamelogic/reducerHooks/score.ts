
export enum ScoreActionType {
    add,
    set
}

export interface IScoreAction {
    type: ScoreActionType
    payload: {
        amount: number
    }
}


export const scoreReducer = (state: number, action: IScoreAction): number => {
    const { type, payload: { amount } } = action;
    let newScore = state;

    switch (type) {
        case ScoreActionType.add:
            newScore = newScore + amount
            break;
        case ScoreActionType.set:
            newScore = amount;
    }

    return newScore;
}