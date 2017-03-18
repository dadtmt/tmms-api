import R from 'ramda'

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

export const getCurrentCrossroadId = R.pipe(
  splitCrossroads,
  R.prop('current'),
  R.propOr(null, 'id')
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
