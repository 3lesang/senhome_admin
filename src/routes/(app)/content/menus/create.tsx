import MenuCreatePage from '@/pages/content/menu/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/content/menus/create')({
  component: MenuCreatePage,
})
