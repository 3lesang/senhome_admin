import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
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
import { Field, FieldLabel } from "@/components/ui/field";
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

type FormValues = z.infer<typeof schema>;

export function SigninPage() {
	const navigate = useNavigate();

	const loginMutation = useMutation({
		mutationFn: (value: FormValues) => {
			return axiosClient.post("/auth/login", {
				identify: value.email,
				password: value.password,
			});
		},
		onSuccess: (data) => {
			localStorage.setItem("token", data.data.token);
			navigate({ to: "/" });
		},
	});

	const form = useForm({
		defaultValues: { email: "", password: "" },
		validators: {
			onSubmit: schema,
		},
		onSubmit: async ({ value }) => loginMutation.mutateAsync(value),
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="h-screen flex justify-center items-center bg-sidebar"
		>
			<Card className="border-none shadow-none w-96">
				<CardHeader>
					<CardTitle>Đăng nhập</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<form.Field name="email">
						{(field) => (
							<Field>
								<FieldLabel>Email</FieldLabel>
								<Input
									type="text"
									placeholder="Địa chỉ email"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</Field>
						)}
					</form.Field>
					<form.Field name="password">
						{(field) => (
							<Field>
								<FieldLabel>Mật khẩu</FieldLabel>
								<Input
									type="password"
									placeholder="Mật khẩu"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</Field>
						)}
					</form.Field>
				</CardContent>
				<CardFooter>
					<Button
						type="submit"
						className="w-full"
						disabled={loginMutation.isPending}
					>
						{loginMutation.isPending && <Spinner />}
						Đăng nhập
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
