import { Card, CardContent, CardHeader, CardTitle } from "@local-services/ui";
import { Wallet } from "lucide-react";

export default function EarningsPage() {
  return (
    <div className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          Earnings
        </h1>
        <p className="text-slate-500 mt-1">
          Track your earnings and payment history
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Earnings Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">Your earnings details will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
