import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In | Service Lagbe?",
  description: "Sign in to your Service Lagbe account",
};

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome Back" subtitle="Please enter your detail">
      <LoginForm />
    </AuthLayout>
  );
}
