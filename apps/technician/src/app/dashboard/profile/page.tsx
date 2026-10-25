import { Card, CardContent, CardHeader, CardTitle } from "@local-services/ui";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          Profile
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your personal information and skills
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">Your profile details will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
