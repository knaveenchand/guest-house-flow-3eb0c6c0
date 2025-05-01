
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Hotel, Plus, Edit, Trash2, Save } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "sonner";

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

// Room types with their base rates
const roomTypes = [
  { name: "Standard Room", totalRooms: 14, description: "Basic amenities, 2 guests max", color: "blue" },
  { name: "Deluxe Room", totalRooms: 12, description: "Enhanced amenities, 3 guests max", color: "indigo" },
  { name: "Suite", totalRooms: 8, description: "Luxury amenities, 4 guests max", color: "purple" }
];

// Initial rates data
const initialRatesData = {
  "Standard Room": {
    "Walk-in": "99",
    "Booking.com": "109",
    "Expedia": "109",
    "WebsiteAquita": "89",
    "Mani Tours": "94",
    "Compass Diving": "94",
    "Aquatica": "89"
  },
  "Deluxe Room": {
    "Walk-in": "149",
    "Booking.com": "159",
    "Expedia": "159",
    "WebsiteAquita": "139",
    "Mani Tours": "145",
    "Compass Diving": "145",
    "Aquatica": "139"
  },
  "Suite": {
    "Walk-in": "249",
    "Booking.com": "269",
    "Expedia": "269",
    "WebsiteAquita": "239",
    "Mani Tours": "245",
    "Compass Diving": "245", 
    "Aquatica": "239"
  }
};

const RoomsSetupPage = () => {
  const [ratesData, setRatesData] = useState(initialRatesData);
  const [editingChannel, setEditingChannel] = useState<string | null>(null);
  
  const handleRateChange = (roomType: string, channel: string, value: string) => {
    // Only allow numeric input with optional decimal point
    if (!/^\d*\.?\d*$/.test(value) && value !== '') {
      return;
    }
    
    setRatesData(prev => ({
      ...prev,
      [roomType]: {
        ...prev[roomType],
        [channel]: value
      }
    }));
  };

  const handleAddRoomType = () => {
    // This would open a modal to add a new room type
    toast.success("Add Room Type functionality will be implemented here");
  };

  const handleAddRatePlan = () => {
    // This would open a modal to add a new rate plan
    toast.success("Add Rate Plan functionality will be implemented here");
  };

  const handleAddChannel = () => {
    // This would open a modal to add a new channel
    toast.success("Add Channel functionality will be implemented here");
  };

  const handleEditChannel = (channel: string) => {
    setEditingChannel(channel);
    toast.success(`Now editing ${channel}`);
  };

  const handleSaveRates = () => {
    // This would save the rates to the backend
    toast.success("Rates have been saved successfully");
  };

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
            <Button onClick={handleAddRoomType}>
              <Plus className="h-4 w-4 mr-2" />
              Add Room Type
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {roomTypes.map((room) => (
              <Card key={room.name}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BedDouble className={`h-5 w-5 text-${room.color}-500`} />
                      <h3 className="font-medium">{room.name}</h3>
                    </div>
                    <Badge className={`bg-${room.color}-500`}>{room.totalRooms} rooms</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{room.description}</p>
                  <div className="mt-3 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Rate Plans Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Rate Plans</h2>
            <Button onClick={handleAddRatePlan}>
              <Plus className="h-4 w-4 mr-2" />
              Add Rate Plan
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Room Rates by Channel</CardTitle>
                  <CardDescription>Configure pricing for different room types and booking channels</CardDescription>
                </div>
                <Button onClick={handleSaveRates} className="ml-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Save Rates
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Transposed Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Channel</TableHead>
                    {roomTypes.map((roomType) => (
                      <TableHead key={roomType.name}>{roomType.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingChannels.map((channel) => (
                    <TableRow key={channel}>
                      <TableCell className="font-medium">{channel}</TableCell>
                      {roomTypes.map((roomType) => (
                        <TableCell key={`${channel}-${roomType.name}`}>
                          <Input 
                            type="price"
                            value={ratesData[roomType.name][channel]}
                            onChange={(e) => handleRateChange(roomType.name, channel, e.target.value)}
                            className="max-w-[100px]"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
        
        {/* Booking Channels Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Booking Channels</h2>
            <Button onClick={handleAddChannel}>
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
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditChannel(channel)}
                          >
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
