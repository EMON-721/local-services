import { Card, CardContent, CardHeader, CardTitle } from "@local-services/ui";
import { Clock } from "lucide-react";

export default function SchedulePage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          Schedule
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your availability and working hours
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">Your schedule will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
