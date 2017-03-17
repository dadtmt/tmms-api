import R from 'ramda'

export const isChoiceMade = R.pipe(
  R.pathOr([], ['choices', 'edges']),
  R.map(R.path(['node', 'made'])),
  R.reduce(
    R.or,
    false
  )
)
