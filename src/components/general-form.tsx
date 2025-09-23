import { zodResolver } from "@hookform/resolvers/zod";
import { FacebookIcon, ImagePlusIcon, YoutubeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AutosizeTextarea } from "./ui/autosize-textarea";
import { LoadingButton } from "./ui/loading-button";

const formSchema = z.object({
	name: z.string().min(1, { message: "This field is required" }),
	description: z.string().optional(),
	email: z
		.email({ message: "Invalid email address" })
		.min(1, { message: "This field is required" }),
	phone: z.string().min(1, { message: "This field is required" }),
	address: z.string().optional(),
	social: z.object({
		facebook: z.string().optional(),
		youtube: z.string().optional(),
	}),
});

export type GeneralFormValuesType = z.infer<typeof formSchema>;

interface GeneralFormProps {
	defaultValues: GeneralFormValuesType;
	onSubmit?: (values: GeneralFormValuesType) => void;
	isPending?: boolean;
}

export default function GeneralForm({
	defaultValues,
	onSubmit,
	isPending,
}: GeneralFormProps) {
	const form = useForm<GeneralFormValuesType>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	function handleSubmit(values: GeneralFormValuesType) {
		onSubmit?.(values);
	}

	function onReset() {
		form.reset();
		form.clearErrors();
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				onReset={onReset}
				className="space-y-8"
			>
				<div className="grid grid-cols-12 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
								<FormLabel className="flex shrink-0">Tên cửa hàng</FormLabel>

								<div className="w-full">
									<FormControl>
										<div className="relative w-full">
											<Input
												placeholder="Tên cửa hàng"
												type="text"
												className="bg-white"
												{...field}
											/>
										</div>
									</FormControl>

									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={() => (
							<FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
								<FormLabel className="flex shrink-0">Logo</FormLabel>

								<div className="w-full">
									<FormControl>
										<div className="relative w-full">
											<div className="size-16 rounded-xl border border-dashed flex items-center justify-center relative">
												<ImagePlusIcon className="size-4 text-gray-500" />
											</div>
										</div>
									</FormControl>

									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
								<FormLabel className="flex shrink-0">Mô tả cửa hàng</FormLabel>

								<div className="w-full">
									<FormControl>
										<AutosizeTextarea
											placeholder="Mô tả cửa hàng"
											className="bg-white"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
								<FormLabel className="flex shrink-0">Email</FormLabel>

								<div className="w-full">
									<FormControl>
										<div className="relative w-full">
											<Input
												placeholder="Email"
												type="email"
												className="bg-white"
												{...field}
											/>
										</div>
									</FormControl>

									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
								<FormLabel className="flex shrink-0">Số điện thoại</FormLabel>

								<div className="w-full">
									<FormControl>
										<div className="relative w-full">
											<Input
												placeholder="Số điện thoại"
												type="tel"
												className="bg-white"
												{...field}
											/>
										</div>
									</FormControl>

									<FormMessage />
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="social.facebook"
						render={({ field }) => (
							<FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
								<FormLabel className="flex shrink-0">Facebook</FormLabel>

								<div className="w-full">
									<FormControl>
										<div className="relative flex items-center gap-4">
											<FacebookIcon className="size-4" />
											<Input
												placeholder="Đường dẫn..."
												className="bg-white"
												{...field}
											/>
										</div>
									</FormControl>

									<FormMessage />
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="social.youtube"
						render={({ field }) => (
							<FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
								<FormLabel className="flex shrink-0">Youtube</FormLabel>

								<div className="w-full">
									<FormControl>
										<div className="relative flex items-center gap-4">
											<YoutubeIcon className="size-4" />
											<Input
												placeholder="Đường dẫn..."
												className="bg-white"
												{...field}
											/>
										</div>
									</FormControl>

									<FormMessage />
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
								<FormLabel className="flex shrink-0">Địa chỉ</FormLabel>

								<div className="w-full">
									<FormControl>
										<AutosizeTextarea
											placeholder="Địa chỉ"
											className="bg-white"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
				</div>
				<LoadingButton type="submit" loading={isPending}>
					Cập nhật
				</LoadingButton>
			</form>
		</Form>
	);
}
