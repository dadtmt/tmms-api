import { isChoiceMade } from './crossroad'

describe('isChoiceMade', () => {
  it('return false if no choices', () => {
    const crossroad = {
      choices: {
        edges: []
      },
      id: 'CURRENT_CROSSROAD_ID'
    }
    expect(isChoiceMade(crossroad)).toBeFalsy()
  })
  it('return true if one choice is made', () => {
    const crossroad = {
      choices: {
        edges: [
          {
            node: {
              made: true
            }
          },
          {
            node: {
              made: false
            }
          }
        ]
      },
      id: 'CURRENT_CROSSROAD_ID'
    }
    expect(isChoiceMade(crossroad)).toBeTruthy()
  })
  it('return false if no choice is made', () => {
    const crossroad = {
      choices: {
        edges: [
          {
            node: {
              made: false
            }
          },
          {
            node: {
              made: false
            }
          }
        ]
      },
      id: 'CURRENT_CROSSROAD_ID'
    }
    expect(isChoiceMade(crossroad)).toBeFalsy()
  })
})
