export const Hide = props => {
  if (props.when) {
    return null
  }
  return props.render ? props.render() : props.children
}

export const Show = props => {
  if (!props.when) {
    return null
  }
  return props.render ? props.render() : props.children
}
