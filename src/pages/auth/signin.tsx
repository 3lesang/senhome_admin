import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import z from "zod";
import { signInHandler } from "@/api/auth/signin";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const schema = z.object({
	email: z.string().min(2, {
		message: "Email must be at least 2 characters.",
	}),
	password: z.string().min(1, {
		message: "Password is required",
	}),
});

export type SigninFormValuesType = z.infer<typeof schema>;

export function SigninPage() {
	const navigate = useNavigate();
	const form = useForm<SigninFormValuesType>({
		resolver: zodResolver(schema),
		defaultValues: { email: "", password: "" },
	});

	const { mutate, isPending } = useMutation({
		mutationFn: signInHandler,
		onSuccess: () => {
			navigate({ to: "/" });
		},
	});

	function handleSubmit(values: SigninFormValuesType) {
		mutate(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="h-screen flex justify-center items-center bg-sidebar"
			>
				<Card className="border-none shadow-none w-96">
					<CardHeader>
						<CardTitle>Đăng nhập</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
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
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full" disabled={isPending}>
							{isPending && <Spinner />}
							Đăng nhập
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
