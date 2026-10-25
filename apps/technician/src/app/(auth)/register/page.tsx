import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Join as Technician | Service Lagbe?",
  description: "Register as a technician on Service Lagbe",
};

export default function RegisterPage() {
  return (
    <AuthLayout title="Join Our" subtitle="Register to start offering your services">
      <RegisterForm />
    </AuthLayout>
  );
}
