
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import RoomTypesSection from "@/components/rooms/RoomTypesSection";
import RatePlansSection from "@/components/rooms/RatePlansSection";
import BookingChannelsSection from "@/components/rooms/BookingChannelsSection";
import PoliciesSection from "@/components/rooms/PoliciesSection";

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
    amenities: ["Wi-Fi", "TV", "Air conditioning", "Private bathroom"],
    maxGuests: 2
  },
  { 
    name: "Deluxe Room", 
    totalRooms: 12, 
    description: "Enhanced amenities, 3 guests max", 
    color: "indigo",
    roomNumbers: ["108", "109", "110", "111", "112", "208", "209", "210", "211", "212", "301", "302"],
    amenities: ["Wi-Fi", "TV", "Air conditioning", "Private bathroom", "Mini fridge", "Safe", "Balcony"],
    maxGuests: 3
  },
  { 
    name: "Suite", 
    totalRooms: 8, 
    description: "Luxury amenities, 4 guests max", 
    color: "purple",
    roomNumbers: ["303", "304", "305", "306", "307", "308", "309", "310"],
    amenities: ["Wi-Fi", "TV", "Air conditioning", "Private bathroom", "Mini fridge", "Safe", "Balcony", "Separate living area", "Jacuzzi", "King size bed"],
    maxGuests: 4
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

const RoomsSetupPage = () => {
  const [ratesData, setRatesData] = useState(initialRatesData);
  const [editingChannel, setEditingChannel] = useState<string | null>(null);
  const [roomTypeList, setRoomTypeList] = useState(roomTypes);
  
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

  return (
    <Layout>
      <div className="space-y-10 pb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rooms Setup</h1>
          <p className="text-muted-foreground">Configure room types, rates, and property settings.</p>
        </div>
        
        {/* Room Types Section */}
        <RoomTypesSection 
          roomTypeList={roomTypeList}
          setRoomTypeList={setRoomTypeList}
          ratesData={ratesData}
          setRatesData={setRatesData}
          bookingChannels={bookingChannels}
        />
        
        {/* Rate Plans Section */}
        <RatePlansSection 
          roomTypeList={roomTypeList}
          bookingChannels={bookingChannels}
          ratesData={ratesData}
          handleRateChange={handleRateChange}
          handleAddRatePlan={handleAddRatePlan}
        />
        
        {/* Booking Channels Section */}
        <BookingChannelsSection 
          bookingChannels={bookingChannels}
          handleEditChannel={handleEditChannel}
          handleAddChannel={handleAddChannel}
        />
        
        {/* Policies Section */}
        <PoliciesSection />
      </div>
    </Layout>
  );
};

export default RoomsSetupPage;
