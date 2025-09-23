import type { SigninFormValuesType } from "@/components/signin-form";
import { signInRootPocket } from "@/pocketbase/auth/signin-root";

async function signInHandler(data: SigninFormValuesType) {
  const { email, password } = data;
  return signInRootPocket({ identify: email, password });
}

export default signInHandler;
