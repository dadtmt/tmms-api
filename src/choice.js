import R from 'ramda'

import { getCurrentCrossroadStep } from './editor'

export const isInteractive = R.cond([
  [
    R.propEq('type', 'dice'),
    R.pipe(R.path(['content', 'master']), R.not)
  ],
  [R.propEq('type', 'characterSheet'), R.F],
  [R.T, R.T]
])

export const newChoice = values => data => ({
  ...values,
  interactive: isInteractive(values),
  made: false,
  step: getCurrentCrossroadStep(data)
})
