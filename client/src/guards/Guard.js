export const RenderGuards = props => {
  if (!props.guards || props.guards.length === 0) {
    return props.children
  }
  const FirstRenderGuard = props.guards[0]
  return (
    <FirstRenderGuard>
      <RenderGuards guards={props.guards.slice(1)}>{props.children}</RenderGuards>
    </FirstRenderGuard>
  )
}

const Guard = props => {
  if (!props.route.guards || props.route.guards.length === 0) {
    return props.children
  }

  return <RenderGuards guards={props.route.guards}>{props.children}</RenderGuards>
}
export default Guard
