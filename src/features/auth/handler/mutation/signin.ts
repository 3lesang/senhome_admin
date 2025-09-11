import type { SigninFormType } from "@/features/auth/components/signin-form/type";
import { signInRootPocket } from "@/pocketbase/auth/signin-root";

async function signInHandler(data: SigninFormType) {
  const { email, password } = data;
  return signInRootPocket({ identify: email, password });
}

export default signInHandler;
