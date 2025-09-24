import {
	queryOptions,
	useMutation,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PolicyForm, {
	type PolicyFormValuesType,
} from "@/components/policy-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { POLICY_COLLECTION } from "@/pocketbase/constants";
import {
	type CreatePolicyPayload,
	createPolicyPocket,
} from "@/pocketbase/store/policy/create";
import { deletePolicyPocket } from "@/pocketbase/store/policy/delete";
import { getListPolicyPocket } from "@/pocketbase/store/policy/list";
import {
	type UpdatePolicyPayload,
	updatePolicyPocket,
} from "@/pocketbase/store/policy/update";
import { queryClient } from "@/queryClient";
import type { PolicyType } from "@/types/store";

const getListPolicyQueryOptions = () => {
	return queryOptions({
		queryKey: [POLICY_COLLECTION],
		queryFn: () => getListPolicyPocket(),
	});
};

interface PolicyTableProps {
	data?: PolicyType[];
}

interface PolicyRowProps {
	data?: PolicyType;
}

function PolicyRow({ data }: PolicyRowProps) {
	const { id, title, content, created, slug } = data ?? {
		id: "",
		title: "",
		created: "",
		slug: "",
	};
	const [open, setOpen] = useState(false);
	const { mutate, isPending } = useMutation({
		mutationFn: (values: PolicyFormValuesType) => {
			const payload: UpdatePolicyPayload = {
				title: values.title,
				slug: values.slug,
				content: values.content,
			};
			return updatePolicyPocket(id, payload);
		},
		onSuccess: () => {
			setOpen(false);
			queryClient.invalidateQueries({ queryKey: [POLICY_COLLECTION] });
		},
	});

	const { mutate: deleteMutate } = useMutation({
		mutationFn: (ids: string[]) => deletePolicyPocket(ids),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [POLICY_COLLECTION],
			});
		},
	});

	const handleSubmit = (values: PolicyFormValuesType) => {
		mutate(values);
	};

	const handleDelete = () => {
		deleteMutate([id]);
	};

	return (
		<>
			<ContextMenu key={id}>
				<ContextMenuTrigger asChild>
					<TableRow key={id}>
						<TableCell className="font-medium">{title}</TableCell>
						<TableCell className="font-medium">{slug}</TableCell>
						<TableCell>{new Date(created).toLocaleDateString()}</TableCell>
					</TableRow>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem onClick={() => setOpen(true)}>
						<EditIcon />
						Chỉnh sửa
					</ContextMenuItem>
					<ContextMenuItem onClick={handleDelete}>
						<Trash2Icon />
						Xóa
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Cập nhật chính sách?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
					<ScrollArea className="h-96">
						<PolicyForm
							defaultValues={{ title, content: JSON.stringify(content), slug }}
							text="Cập nhật"
							onSubmit={handleSubmit}
							isPending={isPending}
						/>
					</ScrollArea>
				</DialogContent>
			</Dialog>
		</>
	);
}

function PolicyTable({ data }: PolicyTableProps) {
	if (!data?.length)
		return (
			<p className="text-center text-sm text-gray-500">Chưa có chính sách</p>
		);
	return (
		<Table className="bg-white rounded-md">
			<TableHeader className="bg-sidebar">
				<TableRow>
					<TableHead>Tên chính sách</TableHead>
					<TableHead>Đường dẫn</TableHead>
					<TableHead>Ngày tạo</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<PolicyRow key={item.id} data={item} />
				))}
			</TableBody>
		</Table>
	);
}

export const Route = createFileRoute("/(app)/store/policy")({
	component: RouteComponent,
	loader(ctx) {
		return ctx.context.queryClient?.ensureQueryData(getListPolicyQueryOptions());
	},
});

function RouteComponent() {
	const [open, setOpen] = useState(false);
	const { data, refetch } = useSuspenseQuery(getListPolicyQueryOptions());
	const { mutate, isPending } = useMutation({
		mutationFn: (values: PolicyFormValuesType) => {
			const payload: CreatePolicyPayload = {
				title: values.title,
				slug: values.slug,
				content: values.content,
			};
			return createPolicyPocket(payload);
		},
		onSuccess: () => {
			refetch();
			setOpen(false);
			toast("Tạo chính sách thành công!");
		},
	});

	const handleSubmit = (values: PolicyFormValuesType) => {
		mutate(values);
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Danh sách chính sách</CardTitle>
				<CardDescription>
					Cập nhật thông tin chính sách bảo hành
				</CardDescription>
				<CardAction>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button>Thêm mới</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Thêm chính sách</DialogTitle>
								<DialogDescription>Tạo chính sách mới</DialogDescription>
							</DialogHeader>
							<ScrollArea className="h-96">
								<PolicyForm
									defaultValues={{ title: "", content: "", slug: "" }}
									onSubmit={handleSubmit}
									isPending={isPending}
									text="Thêm"
								/>
							</ScrollArea>
						</DialogContent>
					</Dialog>
				</CardAction>
			</CardHeader>
			<CardContent>
				<PolicyTable data={data} />
			</CardContent>
		</Card>
	);
}
