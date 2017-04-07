import {
  addChoiceEdge,
  deleteChoiceEdge,
  isActive,
  isChoiceInteractive,
  isStepMade,
  latestStep
} from './crossroad'

describe('isStepMade', () => {
  const crossroad = {
    choices: {
      edges: [
        {
          node: {
            step: 1,
            made: true
          }
        },
        {
          node: {
            step: 1,
            made: false
          }
        },
        {
          node: {
            step: 2,
            made: false
          }
        },
        {
          node: {
            step: 2,
            made: false
          }
        }
      ]
    }
  }
  it('return true if one choice of step is made', () => {
    expect(isStepMade(1)(crossroad)).toBeTruthy()
  })

  it('return false if no choice of step is made', () => {
    expect(isStepMade(2)(crossroad)).toBeFalsy()
  })
})

describe('latestStep', () => {
  it('return highest step value', () => {
    const crossroad = {
      choices: {
        edges: [
          {
            node: {
              step: 1
            }
          },
          {
            node: {
              step: 2
            }
          }
        ]
      }
    }
    expect(latestStep(crossroad)).toBe(2)
  })
})

describe('isChoiceInteractive', () => {
  const crossroad = {
    choices: {
      edges: [
        {
          node: {
            step: 1,
            made: true
          }
        },
        {
          node: {
            step: 1,
            made: false
          }
        },
        {
          node: {
            step: 2,
            made: false
          }
        },
        {
          node: {
            step: 2,
            made: false
          }
        }
      ]
    }
  }
  it('return true if no interactive choice made of same step', () => {
    const choice = {
      interactive: true,
      step: 2
    }
    expect(isChoiceInteractive(choice)(crossroad)).toBeTruthy()
  })
  it('return false if not', () => {
    const choice = {
      interactive: true,
      step: 1
    }
    expect(isChoiceInteractive(choice)(crossroad)).toBeFalsy()
  })
  it('return false if interactive false', () => {
    const choice = {
      interactive: false,
      step: 2
    }
    expect(isChoiceInteractive(choice)(crossroad)).toBeFalsy()
  })
})

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

describe('isActive', () => {
  const choice = {
    interactive: true,
    step: 1
  }
  it ('return true if is ready and no choice made at this step', () => {
    const crossroad = {
      choices: {
        edges: [
          {
            node: {
              made: false,
              interactive: true,
              step: 1
            }
          }
        ]
      },
      id: 'CURRENT_CROSSROAD_ID',
      isReady: true
    }
    expect(isActive(choice)(crossroad)).toBeTruthy()
  })
  it ('return false if not ready', () => {
    const crossroad = {
      id: 'CURRENT_CROSSROAD_ID',
      isReady: false
    }
    expect(isActive(choice)(crossroad)).toBeFalsy()
  })
  it ('return false if ready and choice of same step is made', () => {
    const crossroad = {
      choices: {
        edges: [
          {
            node: {
              made: true,
              interactive: true,
              step: 1
            }
          },
          {
            node: {
              made: false,
              interactive: true,
              step: 1
            }
          }
        ]
      },
      id: 'CURRENT_CROSSROAD_ID',
      isReady: true
    }
    expect(isActive(choice)(crossroad)).toBeFalsy()
  })
  it ('return false if not ready and choice not made', () => {
    const crossroad = {
      choices: {
        edges: [
          {
            node: {
              made: false,
              interactive: true,
              step: 1
            }
          },
          {
            node: {
              made: false,
              interactive: true,
              step: 1
            }
          }
        ]
      },
      id: 'CURRENT_CROSSROAD_ID',
      isReady: false
    }
    expect(isActive(choice)(crossroad)).toBeFalsy()
  })
})
