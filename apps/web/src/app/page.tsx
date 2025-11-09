import { Button, Card, CardHeader, CardTitle, CardContent } from "@local-services/ui";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Local Services</h1>
        <p className="text-muted-foreground mb-8">
          Find and book local services near you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Plumbing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Professional plumbing services for your home.
              </p>
              <Button>Book Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Electrical</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Licensed electricians for all your needs.
              </p>
              <Button>Book Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cleaning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Professional cleaning services.
              </p>
              <Button>Book Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
