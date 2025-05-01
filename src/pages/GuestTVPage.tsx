
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tv, CloudSun, Plane, Film, Calendar } from "lucide-react";

const GuestTVPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Guest TV Interface</h1>
            <p className="text-muted-foreground">
              Manage content displayed on guest TV systems
            </p>
          </div>
          <Button>Preview Interface</Button>
        </div>

        <Tabs defaultValue="welcome">
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="welcome">Welcome</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="flights">Flights</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>
          
          <TabsContent value="welcome" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Message</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="welcome-title" className="text-sm font-medium">Title</label>
                    <input 
                      id="welcome-title"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                      defaultValue="Welcome to Hotel Esplanada" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="welcome-message" className="text-sm font-medium">Message</label>
                    <textarea 
                      id="welcome-message"
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                      defaultValue="We hope you enjoy your stay with us. Please don't hesitate to contact reception if you need assistance." 
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button>Update Welcome Message</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="weather" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudSun className="h-5 w-5" />
                  Weather Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Configure weather display settings and location.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Local Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage local events to display to guests.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="flights" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Flight Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Configure flight information display settings.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="media" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  Media Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage the hotel's media library for guest entertainment.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default GuestTVPage;
