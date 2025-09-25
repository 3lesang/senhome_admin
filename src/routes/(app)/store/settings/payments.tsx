import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/store/settings/payments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/store/settings/payments"!</div>
}
