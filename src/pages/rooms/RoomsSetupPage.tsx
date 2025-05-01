
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BedDouble, Hotel, MapPin, Users } from "lucide-react";

const RoomsSetupPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rooms Setup</h1>
          <p className="text-muted-foreground">Configure room types, rates, and property settings.</p>
        </div>
        
        <Tabs defaultValue="property">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="property">Property</TabsTrigger>
            <TabsTrigger value="rooms">Room Types</TabsTrigger>
            <TabsTrigger value="rates">Rate Plans</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="property" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Property Information</CardTitle>
                <CardDescription>
                  Update your hotel information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="propertyName">Property Name</Label>
                    <Input id="propertyName" defaultValue="Hotel Esplanada" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Input id="propertyType" defaultValue="Boutique Hotel" />
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" />
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Room Configuration</CardTitle>
                <CardDescription>
                  Set the number of rooms and other room-related settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="totalRooms">Total Rooms</Label>
                    <Input id="totalRooms" type="number" defaultValue="34" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floors">Number of Floors</Label>
                    <Input id="floors" type="number" defaultValue="4" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkout">Default Checkout Time</Label>
                    <Input id="checkout" type="time" defaultValue="11:00" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Configuration</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rooms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Room Types</CardTitle>
                <CardDescription>
                  Manage the types of rooms available at your property
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BedDouble className="h-5 w-5 text-blue-500" />
                            <h3 className="font-medium">Standard Room</h3>
                          </div>
                          <Badge className="bg-blue-500">14 rooms</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Basic amenities, 2 guests max</p>
                        <div className="mt-3 flex justify-end">
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BedDouble className="h-5 w-5 text-indigo-500" />
                            <h3 className="font-medium">Deluxe Room</h3>
                          </div>
                          <Badge className="bg-indigo-500">12 rooms</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Enhanced amenities, 3 guests max</p>
                        <div className="mt-3 flex justify-end">
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BedDouble className="h-5 w-5 text-purple-500" />
                            <h3 className="font-medium">Suite</h3>
                          </div>
                          <Badge className="bg-purple-500">8 rooms</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Luxury amenities, 4 guests max</p>
                        <div className="mt-3 flex justify-end">
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Room Type
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rates">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rate Plans</CardTitle>
                <CardDescription>
                  Configure pricing and rate plans for different room types and seasons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Rate plan configuration will be added here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="policies">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hotel Policies</CardTitle>
                <CardDescription>
                  Configure policies for bookings, cancellations, and other rules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Policy configuration will be added here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RoomsSetupPage;
