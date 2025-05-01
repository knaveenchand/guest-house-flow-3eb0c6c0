
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { BedDouble, Hotel, Plus, Edit, Trash2, Save, X } from "lucide-react";
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
  { 
    name: "Standard Room", 
    totalRooms: 14, 
    description: "Basic amenities, 2 guests max", 
    color: "blue",
    roomNumbers: ["101", "102", "103", "104", "105", "106", "107", "201", "202", "203", "204", "205", "206", "207"],
    amenities: ["Wi-Fi", "TV", "Air conditioning", "Private bathroom"]
  },
  { 
    name: "Deluxe Room", 
    totalRooms: 12, 
    description: "Enhanced amenities, 3 guests max", 
    color: "indigo",
    roomNumbers: ["108", "109", "110", "111", "112", "208", "209", "210", "211", "212", "301", "302"],
    amenities: ["Wi-Fi", "TV", "Air conditioning", "Private bathroom", "Mini fridge", "Safe", "Balcony"]
  },
  { 
    name: "Suite", 
    totalRooms: 8, 
    description: "Luxury amenities, 4 guests max", 
    color: "purple",
    roomNumbers: ["303", "304", "305", "306", "307", "308", "309", "310"],
    amenities: ["Wi-Fi", "TV", "Air conditioning", "Private bathroom", "Mini fridge", "Safe", "Balcony", "Separate living area", "Jacuzzi", "King size bed"]
  }
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

// Common amenities for selection
const availableAmenities = [
  "Wi-Fi", "TV", "Air conditioning", "Private bathroom", "Mini fridge", 
  "Safe", "Balcony", "Separate living area", "Jacuzzi", "King size bed", 
  "Queen size bed", "Twin beds", "Sea view", "Garden view", "Pool view",
  "Coffee maker", "Hair dryer", "Iron", "Room service", "Desk"
];

const RoomsSetupPage = () => {
  const [ratesData, setRatesData] = useState(initialRatesData);
  const [editingChannel, setEditingChannel] = useState<string | null>(null);
  const [roomTypeList, setRoomTypeList] = useState(roomTypes);
  
  // New room type form state
  const [newRoomType, setNewRoomType] = useState({
    name: "",
    description: "",
    maxGuests: 2,
    color: "blue",
    amenities: ["Wi-Fi", "TV", "Air conditioning", "Private bathroom"],
  });
  
  // Room numbers state
  const [roomNumbers, setRoomNumbers] = useState<string[]>([]);
  const [newRoomNumber, setNewRoomNumber] = useState("");
  const [isAddRoomTypeOpen, setIsAddRoomTypeOpen] = useState(false);
  
  // Selected amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(["Wi-Fi", "TV", "Air conditioning", "Private bathroom"]);
  
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
  
  const handleAddRoomNumber = () => {
    if (newRoomNumber && !roomNumbers.includes(newRoomNumber)) {
      setRoomNumbers([...roomNumbers, newRoomNumber]);
      setNewRoomNumber("");
    }
  };
  
  const handleRemoveRoomNumber = (roomNumber: string) => {
    setRoomNumbers(roomNumbers.filter(num => num !== roomNumber));
  };
  
  const handleToggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleAddRoomType = () => {
    if (!newRoomType.name) {
      toast.error("Please enter a room type name");
      return;
    }
    
    if (roomNumbers.length === 0) {
      toast.error("Please add at least one room number");
      return;
    }
    
    const newType = {
      name: newRoomType.name,
      totalRooms: roomNumbers.length,
      description: newRoomType.description || `${selectedAmenities.slice(0, 3).join(", ")}, ${newRoomType.maxGuests} guests max`,
      color: newRoomType.color,
      roomNumbers: [...roomNumbers],
      amenities: [...selectedAmenities]
    };
    
    // Add new room type to the list
    setRoomTypeList([...roomTypeList, newType]);
    
    // Add empty rates for the new room type
    const newRates = { ...ratesData };
    newRates[newRoomType.name] = {};
    bookingChannels.forEach(channel => {
      newRates[newRoomType.name][channel] = "0";
    });
    setRatesData(newRates);
    
    // Reset form
    setNewRoomType({
      name: "",
      description: "",
      maxGuests: 2,
      color: "blue",
      amenities: ["Wi-Fi", "TV", "Air conditioning", "Private bathroom"],
    });
    setRoomNumbers([]);
    setSelectedAmenities(["Wi-Fi", "TV", "Air conditioning", "Private bathroom"]);
    
    // Close dialog
    setIsAddRoomTypeOpen(false);
    
    toast.success(`${newType.name} added successfully with ${newType.totalRooms} rooms`);
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
            <Dialog open={isAddRoomTypeOpen} onOpenChange={setIsAddRoomTypeOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room Type
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Room Type</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Room Type Name
                    </Label>
                    <Input
                      id="name"
                      value={newRoomType.name}
                      onChange={(e) => setNewRoomType({ ...newRoomType, name: e.target.value })}
                      placeholder="e.g. Standard Room"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="max-guests" className="text-right">
                      Max Guests
                    </Label>
                    <Input
                      id="max-guests"
                      type="number"
                      min="1"
                      max="10"
                      value={newRoomType.maxGuests}
                      onChange={(e) => setNewRoomType({ ...newRoomType, maxGuests: parseInt(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newRoomType.description}
                      onChange={(e) => setNewRoomType({ ...newRoomType, description: e.target.value })}
                      placeholder="Brief description of room features"
                      className="col-span-3"
                    />
                  </div>
                  
                  {/* Room Numbers */}
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right pt-2">
                      Room Numbers
                    </Label>
                    <div className="col-span-3 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          type="room-number"
                          value={newRoomNumber}
                          onChange={(e) => setNewRoomNumber(e.target.value)}
                          placeholder="101"
                          className="flex-1"
                        />
                        <Button type="button" onClick={handleAddRoomNumber}>
                          Add
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {roomNumbers.map((num) => (
                          <Badge key={num} className="flex items-center gap-1 py-1 px-3">
                            {num}
                            <button 
                              type="button" 
                              onClick={() => handleRemoveRoomNumber(num)}
                              className="ml-1 rounded-full hover:bg-muted/20 p-1"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        {roomNumbers.length === 0 && (
                          <span className="text-sm text-muted-foreground">No rooms added yet</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Total rooms: {roomNumbers.length}
                      </p>
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right pt-2">
                      Amenities
                    </Label>
                    <div className="col-span-3">
                      <div className="flex flex-wrap gap-2">
                        {availableAmenities.map((amenity) => (
                          <Badge 
                            key={amenity} 
                            variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                            className="cursor-pointer py-1 px-3"
                            onClick={() => handleToggleAmenity(amenity)}
                          >
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Selected: {selectedAmenities.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddRoomTypeOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleAddRoomType}>
                    Save Room Type
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {roomTypeList.map((room) => (
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
                  
                  {/* Room details */}
                  <div className="mt-3">
                    <div className="text-xs text-muted-foreground mt-1">
                      <strong>Room numbers:</strong> {room.roomNumbers.slice(0, 5).join(", ")}
                      {room.roomNumbers.length > 5 && ` +${room.roomNumbers.length - 5} more`}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <strong>Amenities:</strong> {room.amenities.slice(0, 4).join(", ")}
                      {room.amenities.length > 4 && ` +${room.amenities.length - 4} more`}
                    </div>
                  </div>
                  
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
                    {roomTypeList.map((roomType) => (
                      <TableHead key={roomType.name}>{roomType.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingChannels.map((channel) => (
                    <TableRow key={channel}>
                      <TableCell className="font-medium">{channel}</TableCell>
                      {roomTypeList.map((roomType) => (
                        <TableCell key={`${channel}-${roomType.name}`}>
                          <Input 
                            type="price"
                            value={ratesData[roomType.name]?.[channel] || "0"}
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
