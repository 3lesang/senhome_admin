import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/category')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/category"!</div>
}
