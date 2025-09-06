import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SigninForm from "@/features/auth/components/signin-form";
import type { SigninFormType } from "@/features/auth/components/signin-form/type";
import signInHandler from "@/features/auth/handler/query/signin";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";

function SigninPage() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: signInHandler,
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  const handleSubmit = (values: SigninFormType) => {
    mutate(values);
  };

  return (
    <div className="bg-gray-50">
      <div className="h-screen flex justify-center items-center">
        <div>
          <Card className="border-none shadow-none w-96">
            <CardHeader>
              <CardTitle>Đăng nhập</CardTitle>
            </CardHeader>
            <CardContent>
              <SigninForm isPending={isPending} onSubmit={handleSubmit} />
            </CardContent>
          </Card>
          <div className="mt-2">
            <span className="text-sm">Chưa có tài khoản?</span>
            <Link to="/signup">Tạo tài khoản</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
