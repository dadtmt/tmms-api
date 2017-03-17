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
  it('copy values and add interactive and made choice', () => {
    const values = {
      some: 'values'
    }
    expect(newChoice(values)).toMatchSnapshot()
  })
  it('copy values and add interactive false for characterSheet type', () => {
    const values = {
      some: 'values',
      type: 'characterSheet'
    }
    expect(newChoice(values)).toMatchSnapshot()
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
      expect(newChoice(values)).toMatchSnapshot()
    }
  )
})
