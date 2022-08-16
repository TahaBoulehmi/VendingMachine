export const Hide = props => {
  if (props.when) {
    return null
  }
  return props.children
}

export const Show = props => {
  if (!props.when) {
    return null
  }
  return props.children
}
