import type { TreeItem } from "./types";

export function getDepth(nodes: TreeItem[], node: TreeItem): number {
	let depth = 0;
	let parent = nodes.find((n) => n.id === node.parentId);
	while (parent) {
		depth++;
		parent = nodes.find((n) => n.id === parent?.parentId);
	}
	return depth;
}

export function flattenTree(
	nodes: TreeItem[],
	collapsed: Record<string, boolean>,
	parentId: string | null = null,
): TreeItem[] {
	const result: TreeItem[] = [];
	const children = nodes
		.filter((n) => n.parentId === parentId)
		.sort((a, b) => a.order - b.order);

	children.forEach((child) => {
		result.push(child);
		if (!collapsed[child.id]) {
			result.push(...flattenTree(nodes, collapsed, child.id));
		}
	});

	return result;
}
