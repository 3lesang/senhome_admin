import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/product/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/product/$id"!</div>
}
