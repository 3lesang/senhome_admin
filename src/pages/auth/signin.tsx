import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { SigninFormValuesType } from "@/components/form/signin";
import SigninForm from "@/components/form/signin";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import signInHandler from "@/handlers/auth/mutation/signin";

export function SigninPage() {
	const navigate = useNavigate();
	const ref = useRef<UseFormReturn<SigninFormValuesType>>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: signInHandler,
		onSuccess: () => {
			navigate({ to: "/" });
		},
	});

	const handleSubmit = () => {
		const form = ref.current;
		if (!form) return;
		form.handleSubmit((values) => mutate(values))();
	};

	return (
		<div className="h-screen flex justify-center items-center bg-gray-50">
			<Card className="border-none shadow-none w-96">
				<CardHeader>
					<CardTitle>Đăng nhập</CardTitle>
					<CardDescription>Welcome to SenHome</CardDescription>
				</CardHeader>
				<CardContent>
					<SigninForm
						ref={ref}
						defaultValues={{
							email: "",
							password: "",
						}}
					/>
				</CardContent>
				<CardFooter>
					<Button type="button" className="w-full" onClick={handleSubmit}>
						{isPending && <Spinner />}
						Đăng nhập
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
