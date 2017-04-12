import R from 'ramda'

import { currentStep } from './crossroad'

export const getCrossroadsEdges = R.pipe(
  R.pathOr(
    [],
    ['viewer', 'user', 'editors', 'edges']
  ),
  R.head,
  R.pathOr({ edges: [] }, ['node', 'crossroads'])
)

export const setCurrentCrossroad = (data, edge) => R.pipe(
  updateEditor(
    R.over(
      R.lensPath(['node', 'crossroads', 'edges']),
      R.prepend(edge)
    )
  )
)(data)

export const splitCrossroads = R.pipe(
  getCrossroadsEdges,
  R.prop('edges'),
  R.applySpec({
    current: R.pipe(R.head, R.propOr(null, 'node')),
    lasts: R.tail
  })
)

const getCurrentCrossroad = R.pipe(
  splitCrossroads,
  R.prop('current')
)

export const getCurrentCrossroadId = R.pipe(
  getCurrentCrossroad,
  R.propOr(null, 'id')
)

export const getCurrentCrossroadStep = R.pipe(
  getCurrentCrossroad,
  currentStep
)

export const updateEditor = update => R.over(
  R.lensPath(['viewer', 'user', 'editors', 'edges']),
  R.over(
    R.lensIndex(0),
    update
  )
)

export const updateCrossroad = update => updateEditor(
  R.over(
    R.lensPath(['node', 'crossroads', 'edges']),
    R.over(
      R.lensIndex(0),
      update
    )
  )
)
