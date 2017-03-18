import {
  addChoiceEdge,
  deleteChoiceEdge,
  isActive,
  isChoiceMade
} from './crossroad'

describe('addChoiceEdge', () => {
  it('add a choice edge', () => {
    const choiceEdge = {
      node: {
        id: 'SECOND_CHOICE'
      }
    }
    const crossroadEdge = {
      node: {
        choices: {
          edges: [{
            node: {
              id: 'FIRST_CHOICE'
            }
          }]
        },
        id: 'CURRENT_CROSSROAD_ID'
      }
    }
    expect(addChoiceEdge(choiceEdge)(crossroadEdge)).toMatchSnapshot()
  })
})

describe('deleteChoiceEdge', () => {
  it('delete a choice edge', () => {
    const choiceToDelete = {
      id: 'SECOND_CHOICE'
    }
    const crossroadEdge = {
      node: {
        choices: {
          edges: [
            {
              node: {
                id: 'FIRST_CHOICE'
              }
            },
            {
              node: {
                id: 'SECOND_CHOICE'
              }
            }
          ]
        },
        id: 'CURRENT_CROSSROAD_ID'
      }
    }
    expect(deleteChoiceEdge(choiceToDelete)(crossroadEdge)).toMatchSnapshot()
  })
})


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

describe('isActive', () => {
  it ('return true if is ready', () => {
    const crossroad = {
      id: 'CURRENT_CROSSROAD_ID',
      isReady: true
    }
    expect(isActive(crossroad)).toBeTruthy()
  })
  it ('return false if is ready', () => {
    const crossroad = {
      id: 'CURRENT_CROSSROAD_ID',
      isReady: false
    }
    expect(isActive(crossroad)).toBeFalsy()
  })
  it ('return false if is ready and choice made', () => {
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
      id: 'CURRENT_CROSSROAD_ID',
      isReady: true
    }
    expect(isActive(crossroad)).toBeFalsy()
  })
  it ('return false if is ready and choice not made', () => {
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
      id: 'CURRENT_CROSSROAD_ID',
      isReady: false
    }
    expect(isActive(crossroad)).toBeFalsy()
  })
})
