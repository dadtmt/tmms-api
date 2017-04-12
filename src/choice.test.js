import { isInteractive, newChoice } from './choice'

describe('isInteractive', () => {
  it('return true by default', () => {
    const values = {}
    expect(isInteractive(values)).toBeTruthy()
  })
  it('return false if type is dice and master true', () => {
    const values = {
      content: {
        master: true
      },
      type: 'dice'
    }
    expect(isInteractive(values)).toBeFalsy()
  })
  it('return true if type is dice and master false', () => {
    const values = {
      content: {
        master: false
      },
      type: 'dice'
    }
    expect(isInteractive(values)).toBeTruthy()
  })
  it('return false if type is characterSheet', () => {
    const values = {
      type: 'characterSheet'
    }
    expect(isInteractive(values)).toBeFalsy()
  })
})

describe('newChoice', () => {
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
  it('copy values and add interactive and made choice', () => {
    const values = {
      some: 'values'
    }
    expect(newChoice(values)(data)).toMatchSnapshot()
  })
  it('copy values and add interactive false for characterSheet type', () => {
    const values = {
      some: 'values',
      type: 'characterSheet'
    }
    expect(newChoice(values)(data)).toMatchSnapshot()
  })
  it(
  'copy values and add interactive false for dice type and content.master true',
    () => {
      const values = {
        content: {
          master: true
        },
        some: 'values',
        type: 'dice'
      }
      expect(newChoice(values)(data)).toMatchSnapshot()
    }
  )
  it('set step to step 2 if step 1 is made', () => {
    const dataStep2 = {
      viewer: {
        user: {
          editors: {
            edges: [{
              node: {
                crossroads: {
                  edges: [{
                    node: {
                      choices: {
                        edges: [{
                          node: {
                            made: true,
                            step: 1
                          }
                        }]
                      },
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
    const values = {
      some: 'values'
    }
    expect(newChoice(values)(dataStep2)).toMatchSnapshot()
  })
})
