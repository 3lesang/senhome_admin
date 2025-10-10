import { DndContext, type DragEndEvent, rectIntersection } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SortableItem } from "./SortableItem";
import type { TreeItem } from "./types";
import { flattenTree, getDepth } from "./util";

interface TreeMenuProps {
	value: TreeItem[];
	onChange?: (values: TreeItem[]) => void;
}

export function TreeMenu({ value, onChange }: TreeMenuProps) {
	const [nodes, setNodes] = useState<TreeItem[]>(value);
	const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState<TreeItem | null>(null);
	const [editingId, setEditingId] = useState<string | null>(null);

	useEffect(() => {
		onChange?.(nodes);
	}, [nodes, onChange]);

	const toggleCollapse = (id: string) => {
		setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	function handleDragEnd(event: DragEndEvent) {
		const { active, over, delta } = event;
		if (!over || active.id === over.id) return;

		setNodes((prev) => {
			const activeNode = prev.find((n) => n.id === active.id);
			const overNode = prev.find((n) => n.id === over.id);
			if (!activeNode || !overNode) return prev;

			// CASE 1: drag left → un-nest
			if (delta.x < -30) {
				const parent = prev.find((n) => n.id === activeNode.parentId);
				return prev.map((n) =>
					n.id === activeNode.id
						? { ...n, parentId: parent ? parent.parentId : null, order: 999 }
						: n,
				);
			}

			// CASE 2: drag right → make child of over
			if (delta.x > 30) {
				return prev.map((n) =>
					n.id === activeNode.id
						? { ...n, parentId: overNode.id, order: 0 }
						: n,
				);
			}

			// CASE 3: vertical reorder among siblings
			const siblings = prev
				.filter(
					(n) => n.parentId === overNode.parentId && n.id !== activeNode.id,
				)
				.sort((a, b) => a.order - b.order);

			const overIndex = siblings.findIndex((n) => n.id === overNode.id);
			const newSiblings = [
				...siblings.slice(0, overIndex),
				{ ...activeNode, parentId: overNode.parentId, order: overIndex },
				...siblings.slice(overIndex),
			].map((n, i) => ({ ...n, order: i }));

			return prev.map((n) => newSiblings.find((s) => s.id === n.id) || n);
		});
	}

	function handleRemove(id: string) {
		function collectToRemove(targetId: string): string[] {
			const children = nodes.filter((n) => n.parentId === targetId);
			return [
				targetId,
				...children.flatMap((child) => collectToRemove(child.id)),
			];
		}
		const idsToRemove = collectToRemove(id);
		setNodes((prev) => prev.filter((n) => !idsToRemove.includes(n.id)));
	}

	function handleAdd(parentId: string | null = null) {
		setEditingId(null);
		setForm({
			id: crypto.randomUUID(),
			title: "",
			url: "",
			parentId,
			order: 0,
		});
		setOpen(true);
	}

	function handleUpdate(id: string) {
		const item = nodes.find((n) => n.id === id);
		if (!item) return;
		setEditingId(id);
		setForm(item);
		setOpen(true);
	}

	function handleSubmit() {
		if (!form) return;

		setNodes((prev) => {
			if (editingId) {
				return prev.map((n) => (n.id === editingId ? { ...n, ...form } : n));
			}
			return [...prev, form];
		});

		setForm(null);
		setEditingId(null);
		setOpen(false);
	}

	const flat = flattenTree(nodes, collapsed);

	return (
		<Card className="border-0 shadow-none p-0">
			<CardContent className="p-0">
				<DndContext
					collisionDetection={rectIntersection}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={flat.map((n) => n.id)}
						strategy={verticalListSortingStrategy}
					>
						{flat.map((node) => (
							<SortableItem
								key={node.id}
								node={node}
								depth={getDepth(nodes, node)}
								collapsed={collapsed}
								toggleCollapse={toggleCollapse}
								onAdd={() => handleAdd(node.id)}
								onUpdate={() => handleUpdate(node.id)}
								onRemove={() => handleRemove(node.id)}
							/>
						))}
					</SortableContext>
				</DndContext>
			</CardContent>
			<CardFooter className="p-0">
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button
							type="button"
							variant="ghost"
							className="w-full"
							onClick={() => handleAdd()}
						>
							<PlusIcon /> Thêm liên kết
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{editingId ? "Chỉnh sửa menu" : "Thêm menu"}
							</DialogTitle>
							<DialogDescription>
								Điền thông tin để {editingId ? "cập nhật" : "thêm"} một mục
								menu.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div className="grid w-full items-center gap-3">
								<Label>Tên</Label>
								<Input
									placeholder="Nhập tên"
									value={form?.title ?? ""}
									onChange={(e) =>
										setForm((prev) =>
											prev ? { ...prev, title: e.target.value } : prev,
										)
									}
								/>
							</div>
							<div className="grid w-full items-center gap-3">
								<Label>Đường dẫn</Label>
								<Input
									placeholder="Nhập URL"
									value={form?.url ?? ""}
									onChange={(e) =>
										setForm((prev) =>
											prev ? { ...prev, url: e.target.value } : prev,
										)
									}
								/>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Hủy</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button type="button" onClick={handleSubmit}>
									Lưu
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</CardFooter>
		</Card>
	);
}
