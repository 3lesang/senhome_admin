import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { UserCircleIcon } from "lucide-react";

function AuthButton() {
  return (
    <Link to="/signin" className={cn(buttonVariants())}>
      <UserCircleIcon />
      Tài khoản
    </Link>
  );
}

export default AuthButton;
