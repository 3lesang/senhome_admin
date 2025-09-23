import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { EditIcon, TrashIcon } from "lucide-react";
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
import { getListPolicyPocket } from "@/pocketbase/store/policy/list";
import {
	type UpdatePolicyPayload,
	updatePolicyPocket,
} from "@/pocketbase/store/policy/update";
import type { PolicyType } from "@/types/store";

export const Route = createFileRoute("/(app)/store/policy")({
	component: RouteComponent,
});

interface PolicyTableProps {
	data?: PolicyType[];
}

interface PolicyRowProps {
	data?: PolicyType;
}

function PolicyRow({ data }: PolicyRowProps) {
	const { id, title, content, created } = data ?? {
		id: "",
		title: "",
		created: "",
	};
	const [open, setOpen] = useState(false);
	const { mutate, isPending } = useMutation({
		mutationFn: (values: PolicyFormValuesType) => {
			const payload: UpdatePolicyPayload = {
				title: values.title,
				content: values.content,
			};
			return updatePolicyPocket(id, payload);
		},
		onSuccess: () => {
			setOpen(false);
		},
	});
	const handleSubmit = (values: PolicyFormValuesType) => {
		mutate(values);
	};

	return (
		<>
			<ContextMenu key={id}>
				<ContextMenuTrigger asChild>
					<TableRow key={id}>
						<TableCell className="font-medium">{title}</TableCell>
						<TableCell>{new Date(created).toLocaleDateString()}</TableCell>
					</TableRow>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem onClick={() => setOpen(true)}>
						<EditIcon />
						Chỉnh sửa
					</ContextMenuItem>
					<ContextMenuItem>
						<TrashIcon />
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
							defaultValues={{ title, content: JSON.stringify(content) }}
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

function RouteComponent() {
	const { data, refetch } = useQuery({
		queryKey: [POLICY_COLLECTION],
		queryFn: () => getListPolicyPocket(),
	});
	const { mutate, isPending } = useMutation({
		mutationFn: (values: PolicyFormValuesType) => {
			const payload: CreatePolicyPayload = {
				title: values.title,
				content: values.content,
			};
			return createPolicyPocket(payload);
		},
		onSuccess: () => {
			refetch();
			toast("Tạo chính sách thành công!");
		},
	});
	const handleSubmit = (values: PolicyFormValuesType) => {
		mutate(values);
	};
	return (
		<Card className="border-0 shadow-none bg-sidebar">
			<CardHeader>
				<CardTitle>Danh sách chính sách</CardTitle>
				<CardDescription>
					Cập nhật thông tin chính sách bảo hành
				</CardDescription>
				<CardAction>
					<Dialog>
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
									defaultValues={{ title: "", content: "" }}
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
