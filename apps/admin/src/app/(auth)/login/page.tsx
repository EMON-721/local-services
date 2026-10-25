import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Admin Login | Service Lagbe?",
  description: "Sign in to the Service Lagbe admin portal",
};

export default function LoginPage() {
  return (
    <AuthLayout title="Admin Login" subtitle="Sign in to access the admin dashboard">
      <LoginForm />
    </AuthLayout>
  );
}
