import { Button, Card, CardHeader, CardTitle, CardContent } from "@local-services/ui";

export default function TechnicianDashboard() {
  return (
    <main className="min-h-screen p-8 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Jobs</h1>
          <Button variant="outline">Toggle Availability</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today&apos;s Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Earnings (MTD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$1,850</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upcoming Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Plumbing Repair</p>
                  <p className="text-sm text-muted-foreground">
                    123 Main St - 2:00 PM
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm">Start Job</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Water Heater Installation</p>
                  <p className="text-sm text-muted-foreground">
                    456 Oak Ave - 4:30 PM
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm">Start Job</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Jobs Nearby</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No available jobs in your area</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
