import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import type { SigninFormValuesType } from "@/components/signin-form";
import SigninForm from "@/components/signin-form";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import signInHandler from "@/handlers/auth/mutation/signin";

export default function SigninPage() {
	const navigate = useNavigate();
	const { mutate, isPending } = useMutation({
		mutationFn: signInHandler,
		onSuccess: () => {
			navigate({ to: "/" });
		},
	});

	const handleSubmit = (values: SigninFormValuesType) => {
		mutate(values);
	};

	return (
		<div className="h-screen flex justify-center items-center bg-gray-50">
			<Card className="border-none shadow-none w-96">
				<CardHeader>
					<CardTitle>Đăng nhập</CardTitle>
				</CardHeader>
				<CardContent>
					<SigninForm
						defaultValues={{
							email: "",
							password: "",
						}}
						isPending={isPending}
						onSubmit={handleSubmit}
					/>
				</CardContent>
				<CardFooter>
					<p>
						<span>Chưa có tài khoản?</span>
						<Link to="/signup">Tạo tài khoản</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
