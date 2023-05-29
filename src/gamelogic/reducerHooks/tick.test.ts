import { type ITickAction, TickType, tickReducer } from './tick'

describe('scoreReducer', () => {
  let initialState: number
  beforeEach(() => {
    initialState = 2
  })
  test('Should add the number', () => {
    const action: ITickAction = {
      type: TickType.tick
    }
    const newState = tickReducer(initialState, action)
    expect(newState).toEqual(3)
  })
  test('Should set the number', () => {
    const action: ITickAction = {
      type: TickType.reset
    }
    const newState = tickReducer(initialState, action)
    expect(newState).toEqual(0)
  })
})
