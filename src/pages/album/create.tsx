import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { JSONContent } from "@tiptap/core";
import { ImagePlusIcon } from "lucide-react";
import { toast } from "sonner";
import z from "zod";
import axiosClient from "@/axios";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { slugify } from "@/lib/utils";
import { s3Client } from "@/s3";
import { useState } from "react";

const schema = z.object({
	title: z.string().min(1),
	slug: z.string(),
	content: z.record(z.string(), z.any()),
	file_url: z.string(),
	file: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof schema>;

function HotspotEditor() {
	const [file, setFile] = useState<File | null>(null);

	if (!file?.name) {
		return (
			<label className="flex items-center justify-center aspect-square border border-dashed rounded-md hover:bg-neutral-100 cursor-pointer">
				<ImagePlusIcon />
				<input
					className="hidden"
					type="file"
					accept="image/*"
					onChange={(e) => {
						const [file] = e.currentTarget.files ?? [];
						setFile(file);
					}}
				/>
			</label>
		);
	}
	const src = URL.createObjectURL(file);

	return (
		<div className="flex items-center aspect-square relative bg-neutral-100">
			<img
				src={src}
				alt="editor"
				className="w-full cursor-crosshair object-contain"
			/>
		</div>
	);
}

export function AlbumCreatePage() {
	const navigate = useNavigate();
	const savePageMutation = useMutation({
		mutationFn: async (value: FormValues) => {
			const slug = value.slug || slugify(value.title);
			const res = await axiosClient.post<{ id: number }>("/posts", {
				title: value.title,
				slug,
			});
			s3Client.send(
				new PutObjectCommand({
					Bucket: "r2-bucket",
					Key: `post/content/${res.data.id}`,
					Body: JSON.stringify(value.content),
					ContentType: "application/json",
				}),
			);
			value.file &&
				s3Client.send(
					new PutObjectCommand({
						Bucket: "r2-bucket",
						Key: `post/file/${res.data.id}`,
						Body: value.file,
						ContentType: value.file?.type,
					}),
				);
			return res;
		},
		onSuccess: () => {
			toast("Bài viết đã được tạo thành công!");
			navigate({ to: "/contents/blogs" });
		},
	});

	const defaultValues: FormValues = {
		title: "",
		slug: "",
		content: { type: "doc", content: [] } as JSONContent,
		file_url: "",
	};

	const form = useForm({
		defaultValues,
		validators: {
			onSubmit: schema,
		},
		onSubmit: ({ value }) => savePageMutation.mutateAsync(value),
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
				<CardHeader>
					<CardTitle>Thêm bộ sưu tập</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-12 gap-4">
					<div className="col-span-8">
						<HotspotEditor />
					</div>
					<div className="col-span-4">
						<Card className="border-0 shadow-none">
							<CardContent></CardContent>
						</Card>
					</div>
				</CardContent>
				<CardFooter>
					<Button
						type="submit"
						disabled={savePageMutation.isPending}
						className="ml-auto"
					>
						{savePageMutation.isPending && <Spinner />}
						Lưu
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
