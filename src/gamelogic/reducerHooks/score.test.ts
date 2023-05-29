import { type IScoreAction, ScoreActionType, scoreReducer } from './score'

describe('scoreReducer', () => {
  let initialState: number
  beforeEach(() => {
    initialState = 2
  })
  test('Should add the number', () => {
    const action: IScoreAction = {
      type: ScoreActionType.add,
      payload: {
        amount: 3
      }
    }
    const newState = scoreReducer(initialState, action)
    expect(newState).toEqual(5)
  })
  test('Should set the number', () => {
    const action: IScoreAction = {
      type: ScoreActionType.set,
      payload: {
        amount: 3
      }
    }
    const newState = scoreReducer(initialState, action)
    expect(newState).toEqual(3)
  })
})
