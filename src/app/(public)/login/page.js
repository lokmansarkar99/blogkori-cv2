import LoginComponent from "@/app/Components/auth/login/LoginComponent";
import LoginForm from "@/app/Components/auth/login/LoginForm";
import { isUser } from "@/services/verify.accessToken";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  //  Only check once, with proper error handling
  try {
    const getUser = await isUser();
    
    // Only redirect if actually authenticated
    if (getUser?.success && getUser?.user) {
      if (getUser.user.role === "admin") {
        redirect("/admin");
      } else if (getUser.user.role === "user") {
        redirect("/user");
      }
    }
  } catch (error) {
    // If auth check fails, just show login page
    console.log("Auth check failed, showing login page");
  }

  return (
    <LoginComponent>
      <LoginForm />
    </LoginComponent>
  );
}
