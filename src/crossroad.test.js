import {
  addChoiceEdge,
  currentStep,
  deleteChoiceEdge,
  isActive,
  isChoiceInteractive,
  isCrossroadActive,
  isLatestStepMade,
  isStepMade,
  latestStep
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

describe('isCrossroadActive', () => {
  it('return true if ready and latestStep is not made', () => {
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
      },
      isReady: true
    }
    expect(isCrossroadActive(crossroad)).toBeTruthy()
  })

  it('return false if not ready and latestStep is not made', () => {
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
      },
      isReady: false
    }
    expect(isCrossroadActive(crossroad)).toBeFalsy()
  })

  it('return false if ready and latestStep is made', () => {
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
              made: true
            }
          }
        ]
      },
      isReady: true
    }
    expect(isCrossroadActive(crossroad)).toBeFalsy()
  })
})

describe('isLatestStepMade', () => {
  it('return true if one choice of latest step is made', () => {
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
              made: true
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

    expect(isLatestStepMade(crossroad)).toBeTruthy()
  })

  it('return false if no choice of latest step is made', () => {
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
    expect(isLatestStepMade(crossroad)).toBeFalsy()
  })
})

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
  it('return 1 if no step', () => {
    const crossroad = {
    }
    expect(latestStep(crossroad)).toBe(1)
  })
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

describe('currentStep', () => {
  it('return latestStep if latestStep not made', () => {
    const crossroad = {
      choices: {
        edges: [
          {
            node: {
              made: true,
              step: 1
            }
          },
          {
            node: {
              made: false,
              step: 2
            }
          }
        ]
      }
    }
    expect(currentStep(crossroad)).toBe(2)
  })
  it('return latestStep+1 if latestStep made', () => {
    const crossroad = {
      choices: {
        edges: [
          {
            node: {
              made: true,
              step: 1
            }
          },
          {
            node: {
              made: true,
              step: 2
            }
          }
        ]
      }
    }
    expect(currentStep(crossroad)).toBe(3)
  })
  it('return 1 if no step', () => {
    const crossroad = {
    }
    expect(currentStep(crossroad)).toBe(1)
  })
})
