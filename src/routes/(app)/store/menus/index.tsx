import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/store/menus/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/store/menus/"!</div>
}
