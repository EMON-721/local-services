import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create Account | Service Lagbe?",
  description: "Create your Service Lagbe account",
};

export default function RegisterPage() {
  return (
    <AuthLayout title="Create Account" subtitle="Join Service Lagbe to get started">
      <RegisterForm />
    </AuthLayout>
  );
}
