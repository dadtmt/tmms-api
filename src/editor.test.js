import R from 'ramda'
import {
  getCrossroadsEdges,
  getCurrentCrossroadId,
  getCurrentCrossroadStep,
  setCurrentCrossroad,
  splitCrossroads,
  updateCrossroad,
  updateEditor
} from './editor'

describe('getCrossroadsEdges', () => {
  it('return empty edges if loading or no value', () => {
    const data = {}
    expect(getCrossroadsEdges(data)).toMatchSnapshot()
  })

  it(
    'return crossroads edges from the current (first of editors edges) editor',
    () => {
      const data = {
        viewer: {
          user: {
            editors: {
              edges: [{
                node: {
                  crossroads: {
                    edges: [
                      {
                        node: {
                          id: 'FIRST_CROSSROAD_ID'
                        }
                      },
                      {
                        node: {
                          id: 'SECOND_CROSSROAD_ID'
                        }
                      }
                    ]
                  },
                  id: 'EDITOR_ID'
                }
              }]
            }
          }
        }
      }
      expect(getCrossroadsEdges(data)).toMatchSnapshot()
    }
  )
})

describe('setCurrentCrossroad', () => {
  it('prepend a crossroad to crossroad edges', () => {
    const newCrossroadEdge = {
      node: {
        id: 'NEW_CROSSROAD_ID'
      }
    }
    const data = {
      viewer: {
        user: {
          editors: {
            edges: [{
              node: {
                crossroads: {
                  edges: [
                    {
                      node: {
                        id: 'FIRST_CROSSROAD_ID'
                      }
                    },
                    {
                      node: {
                        id: 'SECOND_CROSSROAD_ID'
                      }
                    },
                    {
                      node: {
                        id: 'THIRD_CROSSROAD_ID'
                      }
                    }
                  ]
                },
                id: 'EDITOR_ID'
              }
            }]
          }
        }
      }
    }
    expect(setCurrentCrossroad(data, newCrossroadEdge)).toMatchSnapshot()
  })
})

describe('getCurrentCrossroadId', () => {
  it('return null if no crossroads', () => {
    const data = {}
    expect(getCurrentCrossroadId(data)).toMatchSnapshot()
  })

  it('return first crossroad id', () => {
    const data = {
      viewer: {
        user: {
          editors: {
            edges: [{
              node: {
                crossroads: {
                  edges: [
                    {
                      node: {
                        id: 'CURRENT_CROSSROAD_ID'
                      }
                    },
                    {
                      node: {
                        id: 'SECOND_CROSSROAD_ID'
                      }
                    },
                    {
                      node: {
                        id: 'THIRD_CROSSROAD_ID'
                      }
                    }
                  ]
                },
                id: 'EDITOR_ID'
              }
            }]
          }
        }
      }
    }
    expect(getCurrentCrossroadId(data)).toMatchSnapshot()
  })
})

describe('getCurrentCrossroadStep', () => {
  it('return 1 if no crossroads', () => {
    const data = {}
    expect(getCurrentCrossroadStep(data)).toBe(1)
  })

  it('return current step', () => {
    const data = {
      viewer: {
        user: {
          editors: {
            edges: [{
              node: {
                crossroads: {
                  edges: [
                    {
                      node: {
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
                        },
                        id: 'CURRENT_CROSSROAD_ID'
                      }
                    },
                    {
                      node: {
                        id: 'SECOND_CROSSROAD_ID'
                      }
                    },
                    {
                      node: {
                        id: 'THIRD_CROSSROAD_ID'
                      }
                    }
                  ]
                },
                id: 'EDITOR_ID'
              }
            }]
          }
        }
      }
    }
    expect(getCurrentCrossroadStep(data)).toBe(2)
  })
})

describe('splitCrossroads', () => {
  it('return empty nodes', () => {
    const data = {}
    expect(splitCrossroads(data)).toMatchSnapshot()
  })
  it(
    'return currentCrossroad(first node) and lastCrossraods(the others)',
    () => {
      const data = {
        viewer: {
          user: {
            editors: {
              edges: [{
                node: {
                  crossroads: {
                    edges: [
                      {
                        node: {
                          id: 'CURRENT_CROSSROAD_ID'
                        }
                      },
                      {
                        node: {
                          id: 'SECOND_CROSSROAD_ID'
                        }
                      },
                      {
                        node: {
                          id: 'THIRD_CROSSROAD_ID'
                        }
                      }
                    ]
                  },
                  id: 'EDITOR_ID'
                }
              }]
            }
          }
        }
      }
      expect(splitCrossroads(data)).toMatchSnapshot()
    }
  )
})

describe('updateCrossroad', () => {
  it(
    'apply func update to the current (first of crossroads edges) crossroad',
    () => {
      const update = R.assoc(true, 'updated')
      const data = {
        viewer: {
          user: {
            editors: {
              edges: [{
                node: {
                  crossroads: {
                    edges: [{
                      node: {
                        id: 'CROSSROAD_ID'
                      }
                    }]
                  },
                  id: 'EDITOR_ID'
                }
              }]
            }
          }
        }
      }
      expect(updateCrossroad(update)(data)).toMatchSnapshot()
    }
  )
})

describe('updateEditor', () => {
  it('apply func update to the current (first of editors edges) editor', () => {
    const update = R.assoc(true, 'updated')
    const data = {
      viewer: {
        user: {
          editors: {
            edges: [{
              node: {
                id: 'EDITOR_ID'
              }
            }]
          }
        }
      }
    }
    expect(updateEditor(update)(data)).toMatchSnapshot()
  })
})
