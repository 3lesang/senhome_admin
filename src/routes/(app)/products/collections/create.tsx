import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/products/collections/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/products/collections/create"!</div>
}
