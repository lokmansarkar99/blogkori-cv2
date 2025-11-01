import LoginComponent from "@/app/Components/auth/login/LoginComponent";
import LoginForm from "@/app/Components/auth/login/LoginForm";
import { isUser } from "@/services/verify.accessToken";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  console.log('🔍 [LOGIN PAGE] Starting auth check...');
  
  //  Check authentication
  const authResult = await isUser();
  
  console.log('🔍 [LOGIN PAGE] Auth result:', {
    success: authResult.success,
    hasUser: !!authResult.user,
    role: authResult.user?.role
  });

  //  Only redirect if actually authenticated
  if (authResult?.success && authResult?.user) {
    console.log(' [LOGIN PAGE] User authenticated, redirecting...');
    
    if (authResult.user.role === "admin") {
      redirect("/admin");
    } else {
      redirect("/user");
    }
  }

  console.log('📄 [LOGIN PAGE] Showing login form');
  
  return (
    <LoginComponent>
      <LoginForm />
    </LoginComponent>
  );
}
