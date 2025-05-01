
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Hotel, Plus, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Booking channels
const bookingChannels = [
  "Walk-in",
  "Booking.com",
  "Expedia",
  "WebsiteAquita",
  "Mani Tours",
  "Compass Diving",
  "Aquatica"
];

const RoomsSetupPage = () => {
  return (
    <Layout>
      <div className="space-y-10 pb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rooms Setup</h1>
          <p className="text-muted-foreground">Configure room types, rates, and property settings.</p>
        </div>
        
        {/* Room Types Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Room Types</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Room Type
            </Button>
          </div>
          
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
                <div className="mt-3 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
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
                <div className="mt-3 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
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
                <div className="mt-3 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Rate Plans Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Rate Plans</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Rate Plan
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Room Rates by Channel</CardTitle>
              <CardDescription>Configure pricing for different room types and booking channels</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room Type</TableHead>
                    {bookingChannels.map((channel) => (
                      <TableHead key={channel}>{channel}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Standard Room</TableCell>
                    <TableCell>$99</TableCell>
                    <TableCell>$109</TableCell>
                    <TableCell>$109</TableCell>
                    <TableCell>$89</TableCell>
                    <TableCell>$94</TableCell>
                    <TableCell>$94</TableCell>
                    <TableCell>$89</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Deluxe Room</TableCell>
                    <TableCell>$149</TableCell>
                    <TableCell>$159</TableCell>
                    <TableCell>$159</TableCell>
                    <TableCell>$139</TableCell>
                    <TableCell>$145</TableCell>
                    <TableCell>$145</TableCell>
                    <TableCell>$139</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Suite</TableCell>
                    <TableCell>$249</TableCell>
                    <TableCell>$269</TableCell>
                    <TableCell>$269</TableCell>
                    <TableCell>$239</TableCell>
                    <TableCell>$245</TableCell>
                    <TableCell>$245</TableCell>
                    <TableCell>$239</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
        
        {/* Booking Channels Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Booking Channels</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Channel
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Channel Name</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Payment Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingChannels.map((channel, index) => (
                    <TableRow key={channel}>
                      <TableCell className="font-medium">{channel}</TableCell>
                      <TableCell>{index === 0 ? '0%' : `${(index + 1) * 2}%`}</TableCell>
                      <TableCell>
                        {index === 0 ? 'Direct' : index % 2 === 0 ? 'Prepaid' : 'On Arrival'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
        
        {/* Policies Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Policies</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Policy
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cancellation Policies</CardTitle>
                <CardDescription>Define cancellation rules by channel</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Channel</TableHead>
                      <TableHead>Free Cancel</TableHead>
                      <TableHead>Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Walk-in</TableCell>
                      <TableCell>24 hours</TableCell>
                      <TableCell>1 night</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Booking.com</TableCell>
                      <TableCell>48 hours</TableCell>
                      <TableCell>100%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Expedia</TableCell>
                      <TableCell>48 hours</TableCell>
                      <TableCell>100%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Policies</CardTitle>
                <CardDescription>Define payment rules by channel</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Channel</TableHead>
                      <TableHead>Deposit</TableHead>
                      <TableHead>Payment Due</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Walk-in</TableCell>
                      <TableCell>None</TableCell>
                      <TableCell>On arrival</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Booking.com</TableCell>
                      <TableCell>10%</TableCell>
                      <TableCell>At booking</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Expedia</TableCell>
                      <TableCell>15%</TableCell>
                      <TableCell>At booking</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RoomsSetupPage;
