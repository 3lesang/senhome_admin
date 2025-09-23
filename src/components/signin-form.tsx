import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "./ui/loading-button";

const SigninFormSchema = z.object({
	email: z.string().min(2, {
		message: "Email must be at least 2 characters.",
	}),
	password: z.string().min(1, {
		message: "Password is required",
	}),
});

export type SigninFormValuesType = z.infer<typeof SigninFormSchema>;

interface SigninFormProps {
	defaultValues: SigninFormValuesType;
	onSubmit?: (values: SigninFormValuesType) => void;
	isPending?: boolean;
}

export default function SigninForm({
	defaultValues,
	onSubmit,
	isPending,
}: SigninFormProps) {
	const form = useForm<SigninFormValuesType>({
		resolver: zodResolver(SigninFormSchema),
		defaultValues,
	});

	const handleSubmit = (values: SigninFormValuesType) => {
		onSubmit?.(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mật khẩu</FormLabel>
							<FormControl>
								<Input placeholder="Mật khẩu" {...field} type="password" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<LoadingButton type="submit" className="w-full" loading={isPending}>
					Đăng nhập
				</LoadingButton>
			</form>
		</Form>
	);
}
