import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bisno/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bisno/"!</div>
}
