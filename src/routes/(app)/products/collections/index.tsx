import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/products/collections/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/products/collections/"!</div>
}
