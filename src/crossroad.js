import R from 'ramda'

export const addChoiceEdge = edge => R.over(
  R.lensPath(['node', 'choices', 'edges']),
  R.append(edge)
)

export const deleteChoiceEdge = edge => R.over(
  R.lensPath(['node', 'choices', 'edges']),
  R.filter(({ node }) => node.id !== edge.id)
)

export const isChoiceMade = R.pipe(
  R.pathOr([], ['choices', 'edges']),
  R.map(R.path(['node', 'made'])),
  R.reduce(
    R.or,
    false
  )
)

export const isActive = R.converge(
    R.and,
    [R.propOr(false, 'isReady'), R.complement(isChoiceMade)]
  )

export const latestStep = R.pipe(
    R.pathOr([], ['choices', 'edges']),
    R.map(R.path(['node', 'step'])),
    R.sort((a, b) => b - a ),
    R.head
  )

export const isStepMade = step => R.pipe(
  R.pathOr([],['choices', 'edges']),
  R.filter(
    R.pipe(
      R.path(['node', 'step']),
      R.equals(step)
    )
  ),
  R.map(R.path(['node', 'made'])),
  R.reduce(R.or, false)
)

export const isChoiceInteractive = choice => R.pipe(
    latestStep,
    R.equals(R.prop('step', choice)),
    R.and(R.prop('interactive', choice))
  )
