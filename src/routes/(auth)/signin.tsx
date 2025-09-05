import SigninForm from "@/features/auth/components/signin-form";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-gray-50">
      <div className="h-screen flex justify-center items-center">
        <div>
          <Card className="border-none shadow-none w-96">
            <CardHeader>
              <CardTitle>Đăng nhập</CardTitle>
            </CardHeader>
            <CardContent>
              <SigninForm />
            </CardContent>
          </Card>
          <div className="mt-2">
            <span className="text-sm">Chưa có tài khoản?</span>
            <a
              href="/app/signup"
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-sky-500"
              )}
            >
              Tạo tài khoản
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
