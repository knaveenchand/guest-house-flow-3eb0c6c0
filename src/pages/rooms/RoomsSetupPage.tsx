
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

import { RoomType, getRoomTypes, updateRoomType } from "@/api/roomTypes";
import { BookingChannel, getBookingChannels, addBookingChannel, updateBookingChannel, deleteBookingChannel } from "@/api/bookingChannels";

import RoomTypesSection from "@/components/rooms/RoomTypesSection";
import RatePlansSection from "@/components/rooms/RatePlansSection";
import BookingChannelsSection from "@/components/rooms/BookingChannelsSection";
import PoliciesSection from "@/components/rooms/PoliciesSection";

const RoomsSetupPage = () => {
  const [roomTypeList, setRoomTypeList] = useState<RoomType[]>([]);
  const [bookingChannels, setBookingChannels] = useState<BookingChannel[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rooms, channels] = await Promise.all([
          getRoomTypes(),
          getBookingChannels(),
        ]);
        setRoomTypeList(rooms);
        setBookingChannels(channels);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load room and channel data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // This function transforms the roomTypeList into the ratesData structure expected by child components
  const getRatesData = () => {
    const rates: { [roomTypeName: string]: { [channelName: string]: string } } = {};
    for (const roomType of roomTypeList) {
      rates[roomType.name] = {};
      for (const channel of bookingChannels) {
        // Find the rate for the current channel in the roomType's rates map
        const rateValue = roomType.rates[channel.id!]?.toString() || "0";
        rates[roomType.name][channel.name] = rateValue;
      }
    }
    return rates;
  };
  
  const handleRateChange = async (roomTypeName: string, channelName: string, value: string) => {
    const newRate = parseFloat(value);
    if (isNaN(newRate)) {
      toast.error("Invalid rate value.");
      return;
    }

    const roomTypeToUpdate = roomTypeList.find(rt => rt.name === roomTypeName);
    const channelToUpdate = bookingChannels.find(bc => bc.name === channelName);

    if (!roomTypeToUpdate || !channelToUpdate) {
      toast.error("Could not find the room type or channel to update.");
      return;
    }

    const updatedRates = {
      ...roomTypeToUpdate.rates,
      [channelToUpdate.id!]: newRate,
    };

    try {
      await updateRoomType(roomTypeToUpdate.id!, { rates: updatedRates });
      
      // Optimistically update local state for immediate UI feedback
      setRoomTypeList(prevList => 
        prevList.map(rt => 
          rt.id === roomTypeToUpdate.id ? { ...rt, rates: updatedRates } : rt
        )
      );
      toast.success(`Rate for ${roomTypeName} on ${channelName} updated.`);
    } catch (error) {
      console.error("Error updating rate:", error);
      toast.error("Failed to update rate.");
    }
  };

  const handleAddChannel = async (channelName: string, commission: string, paymentType: string) => {
    try {
      const newChannel: Omit<BookingChannel, 'id'> = { 
        name: channelName,
        commission: parseFloat(commission) || 0,
        paymentType: paymentType
      };
      
      const docRef = await addBookingChannel(newChannel);
      const addedChannel = { ...newChannel, id: docRef.id };
      
      setBookingChannels(prev => [...prev, addedChannel]);
      toast.success(`Added ${channelName} to booking channels.`);
    } catch (error) {
      console.error("Error adding channel:", error);
      toast.error("Failed to add booking channel.");
    }
  };

  const handleEditChannel = async (oldName: string, newName: string) => {
    const channelToUpdate = bookingChannels.find(bc => bc.name === oldName);
    if (!channelToUpdate) {
      toast.error("Could not find the channel to edit.");
      return;
    }

    try {
      await updateBookingChannel(channelToUpdate.id!, { name: newName });
      setBookingChannels(prev => 
        prev.map(c => c.id === channelToUpdate.id ? { ...c, name: newName } : c)
      );
      toast.success(`Updated channel from ${oldName} to ${newName}.`);
    } catch (error) {
      console.error("Error editing channel:", error);
      toast.error("Failed to edit booking channel.");
    }
  };

  const handleDeleteChannel = async (channelName: string) => {
    const channelToDelete = bookingChannels.find(bc => bc.name === channelName);
    if (!channelToDelete) {
      toast.error("Could not find the channel to delete.");
      return;
    }
    
    // As a safeguard, you might want to prevent deleting critical channels
    if (channelToDelete.name === "Walk-in") {
        toast.error("The 'Walk-in' channel cannot be deleted.");
        return;
    }

    try {
      await deleteBookingChannel(channelToDelete.id!);
      
      // Also remove the rate from all room types that use this channel
      const updatePromises = roomTypeList.map(rt => {
        const { [channelToDelete.id!]: _, ...remainingRates } = rt.rates;
        return updateRoomType(rt.id!, { rates: remainingRates });
      });

      await Promise.all(updatePromises);

      // Update state locally
      setBookingChannels(prev => prev.filter(c => c.id !== channelToDelete.id));
      setRoomTypeList(prev => prev.map(rt => {
          const { [channelToDelete.id!]: _, ...remainingRates } = rt.rates;
          return { ...rt, rates: remainingRates };
      }));

      toast.success(`Deleted ${channelName} from booking channels.`);
    } catch (error) {
      console.error("Error deleting channel:", error);
      toast.error("Failed to delete booking channel.");
    }
  };

  if (loading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="space-y-10 pb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rooms Setup</h1>
          <p className="text-muted-foreground">Configure room types, rates, and property settings.</p>
        </div>
        
        <RoomTypesSection 
          roomTypeList={roomTypeList}
          setRoomTypeList={setRoomTypeList}
          bookingChannels={bookingChannels}
        />
        
        <RatePlansSection 
          roomTypeList={roomTypeList.map(rt => ({
            name: rt.name,
            description: rt.description,
            color: rt.color,
            roomNumbers: rt.roomNumbers,
            maxGuests: rt.maxGuests,
            totalRooms: rt.roomNumbers.length,
            amenities: rt.amenities.map(a => a.name)
          }))}
          bookingChannels={bookingChannels.map(c => c.name)}
          ratesData={getRatesData()}
          handleRateChange={handleRateChange}
          handleAddRatePlan={() => toast.info("This will be implemented later.")}
        />
        
        <BookingChannelsSection 
          bookingChannels={bookingChannels.map(c => c.name)}
          handleEditChannel={handleEditChannel}
          handleAddChannel={handleAddChannel}
          handleDeleteChannel={handleDeleteChannel}
        />
        
        <PoliciesSection />
      </div>
    </Layout>
  );
};

export default RoomsSetupPage;
