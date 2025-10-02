import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
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
	ref: React.Ref<UseFormReturn<SigninFormValuesType>>;
}

export default function SigninForm({ defaultValues, ref }: SigninFormProps) {
	const form = useForm<SigninFormValuesType>({
		resolver: zodResolver(SigninFormSchema),
		defaultValues,
	});

	useImperativeHandle(ref, () => form);
	return (
		<Form {...form}>
			<form className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Địa chỉ email" {...field} />
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
			</form>
		</Form>
	);
}
