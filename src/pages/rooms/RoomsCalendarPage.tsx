
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, List, PlaneLanding, PlaneTakeoff, BedDouble, Bed, Clock, Settings, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Calendar view layout
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);
const roomTypes = ["All", "Standard", "Deluxe", "Suite"];

// Sample rooms
const rooms = [
  { id: 1, number: "101", type: "Standard" },
  { id: 2, number: "102", type: "Standard" },
  { id: 3, number: "201", type: "Deluxe" },
  { id: 4, number: "202", type: "Deluxe" },
  { id: 5, number: "301", type: "Suite" },
];

// Sample bookings
const bookings = [
  { 
    id: 1, 
    roomId: 1, 
    guestName: "John Smith", 
    startDate: new Date(2025, 4, 1, 14, 0), 
    endDate: new Date(2025, 4, 3, 11, 0),
    status: "confirmed"
  },
  { 
    id: 2, 
    roomId: 3, 
    guestName: "Alice Johnson", 
    startDate: new Date(2025, 4, 2, 15, 0), 
    endDate: new Date(2025, 4, 5, 12, 0),
    status: "confirmed"
  },
  { 
    id: 3, 
    roomId: 5, 
    guestName: "Robert Davis", 
    startDate: new Date(2025, 4, 4, 14, 0), 
    endDate: new Date(2025, 4, 10, 11, 0),
    status: "pending"
  },
];

// Helper function to get the current week dates
const getCurrentWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0-6, Sunday-Saturday
  const diff = today.getDate() - currentDay;
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(diff + i);
    return date;
  });
};

const RoomsCalendarPage = () => {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeekDates());
  const [selectedRoomType, setSelectedRoomType] = useState("All");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);

  // Filter rooms based on selected room type
  const filteredRooms = selectedRoomType === "All" 
    ? rooms 
    : rooms.filter(room => room.type === selectedRoomType);

  // Function to navigate to previous week
  const goToPreviousWeek = () => {
    const prevWeek = currentWeek.map(date => {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() - 7);
      return newDate;
    });
    setCurrentWeek(prevWeek);
  };

  // Function to navigate to next week
  const goToNextWeek = () => {
    const nextWeek = currentWeek.map(date => {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + 7);
      return newDate;
    });
    setCurrentWeek(nextWeek);
  };

  // Function to check if a booking falls on a specific date and room
  const getBookingForDateAndRoom = (date: Date, roomId: number) => {
    return bookings.find(booking => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      
      return (
        booking.roomId === roomId &&
        date >= bookingStart &&
        date <= bookingEnd
      );
    });
  };

  // Open booking details modal
  const openBookingDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsBookingModalOpen(true);
  };

  // Handle creating a new booking
  const handleNewBooking = () => {
    setIsNewBookingModalOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Room Calendar</h1>
            <p className="text-muted-foreground">
              View and manage room bookings
            </p>
          </div>
          <Button onClick={handleNewBooking}>
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </div>
        
        {/* Calendar Navigation */}
        <div className="flex justify-between items-center bg-gray-900 p-3 rounded-md">
          <Button variant="outline" onClick={goToPreviousWeek}>
            Previous Week
          </Button>
          
          <div className="flex items-center">
            <span className="font-medium mr-4">
              {currentWeek[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {currentWeek[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            
            <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Room Type" />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" onClick={goToNextWeek}>
            Next Week
          </Button>
        </div>
        
        {/* Calendar Grid */}
        <div className="border rounded-lg overflow-hidden bg-gray-800">
          {/* Calendar Header */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-3 font-medium border-r text-center">Room</div>
            {currentWeek.map((date, index) => (
              <div 
                key={index} 
                className={`p-3 font-medium border-r text-center ${date.toDateString() === new Date().toDateString() ? 'bg-yellow-900 bg-opacity-20' : ''}`}
              >
                <div>{daysOfWeek[index]}</div>
                <div>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              </div>
            ))}
          </div>
          
          {/* Calendar Body */}
          {filteredRooms.map(room => (
            <div key={room.id} className="grid grid-cols-8 border-b">
              <div className="p-3 border-r flex flex-col justify-center">
                <div className="font-medium">{room.number}</div>
                <div className="text-sm text-gray-400">{room.type}</div>
              </div>
              
              {currentWeek.map((date, index) => {
                const booking = getBookingForDateAndRoom(date, room.id);
                
                return (
                  <div 
                    key={index} 
                    className={`p-2 border-r relative ${date.toDateString() === new Date().toDateString() ? 'bg-yellow-900 bg-opacity-10' : ''}`}
                  >
                    {booking && (
                      <div 
                        className={`p-1 rounded text-xs h-full cursor-pointer ${
                          booking.status === 'confirmed' ? 'bg-blue-900 bg-opacity-40' : 'bg-yellow-900 bg-opacity-40'
                        }`}
                        onClick={() => openBookingDetails(booking)}
                      >
                        <div className="font-medium">{booking.guestName}</div>
                        {date.toDateString() === new Date(booking.startDate).toDateString() && (
                          <div className="flex items-center text-green-400">
                            <PlaneLanding className="h-3 w-3 mr-1" />
                            <span>Check-in</span>
                          </div>
                        )}
                        {date.toDateString() === new Date(booking.endDate).toDateString() && (
                          <div className="flex items-center text-red-400">
                            <PlaneTakeoff className="h-3 w-3 mr-1" />
                            <span>Check-out</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Booking Details Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              {selectedBooking && `Booking for ${selectedBooking.guestName}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Room</Label>
                  <div className="font-medium">
                    {rooms.find(r => r.id === selectedBooking.roomId)?.number}
                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  <div>
                    <Badge className={selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Check-in</Label>
                  <div className="font-medium">
                    {new Date(selectedBooking.startDate).toLocaleDateString()} at {new Date(selectedBooking.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div>
                  <Label>Check-out</Label>
                  <div className="font-medium">
                    {new Date(selectedBooking.endDate).toLocaleDateString()} at {new Date(selectedBooking.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Guest</Label>
                <div className="font-medium">{selectedBooking.guestName}</div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsBookingModalOpen(false)}>Close</Button>
            <div className="space-x-2">
              <Button variant="destructive">Cancel Booking</Button>
              <Button>Edit Booking</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New Booking Modal */}
      <Dialog open={isNewBookingModalOpen} onOpenChange={setIsNewBookingModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Booking</DialogTitle>
            <DialogDescription>
              Create a new room booking
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guest-name">Guest Name</Label>
                <Input id="guest-name" placeholder="Enter guest name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room-select">Room</Label>
                <Select>
                  <SelectTrigger id="room-select">
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map(room => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        {room.number} - {room.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="check-in">Check-in Date</Label>
                <Input id="check-in" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="check-out">Check-out Date</Label>
                <Input id="check-out" type="date" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Add any special requests or notes" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewBookingModalOpen(false)}>Cancel</Button>
            <Button>Create Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default RoomsCalendarPage;
