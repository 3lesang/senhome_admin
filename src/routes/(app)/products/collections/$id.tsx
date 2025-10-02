import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/products/collections/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/products/collections/$id"!</div>
}
