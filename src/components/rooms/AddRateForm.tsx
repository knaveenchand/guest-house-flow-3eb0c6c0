import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoomType, getRoomTypes } from '@/api/roomTypes';
import { BookingChannel, getBookingChannels } from '@/api/bookingChannels';
import { addRoomRate } from '@/api/roomRates';
import { RoomRate } from '@/types/roomRates';
import { toast } from 'sonner';
import { addDays, differenceInDays, startOfDay } from 'date-fns';
import { DocumentReference } from 'firebase/firestore';

interface AddRateFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialData?: Partial<Omit<RoomRate, 'id' | 'rate'>> & { rate?: number };
  onRateAdded: (newRates: RoomRate[]) => void;
}

const AddRateForm: React.FC<AddRateFormProps> = ({ isOpen, setIsOpen, initialData, onRateAdded }) => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [bookingChannels, setBookingChannels] = useState<BookingChannel[]>([]);
  
  const [roomTypeId, setRoomTypeId] = useState<string | undefined>(initialData?.roomTypeId);
  const [bookingChannelId, setBookingChannelId] = useState<string | undefined>(initialData?.bookingChannelId);
  const [validFrom, setValidFrom] = useState<Date | undefined>(initialData?.date);
  const [validUntil, setValidUntil] = useState<Date | undefined>(initialData?.date);
  const [rate, setRate] = useState<number | ''>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedRoomTypes, fetchedBookingChannels] = await Promise.all([
          getRoomTypes(),
          getBookingChannels(),
        ]);
        setRoomTypes(fetchedRoomTypes);
        setBookingChannels(fetchedBookingChannels);
      } catch (error) {
        toast.error("Failed to load necessary data.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setRoomTypeId(initialData?.roomTypeId);
      setBookingChannelId(initialData?.bookingChannelId);
      setValidFrom(initialData?.date ? startOfDay(initialData.date) : undefined);
      setValidUntil(initialData?.date ? startOfDay(initialData.date) : undefined);
      setRate('');
    }
  }, [isOpen, initialData]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!roomTypeId || !bookingChannelId || !validFrom || !validUntil || rate === '') {
      toast.error("All fields are required.");
      return;
    }

    const from = startOfDay(validFrom);
    const until = startOfDay(validUntil);
    const today = startOfDay(new Date());

    if (from < today) {
      toast.error("Start date cannot be in the past.");
      return;
    }

    if (until < from) {
      toast.error("End date cannot be before the start date.");
      return;
    }
    
    try {
      const numberOfDays = differenceInDays(until, from) + 1;
      const ratePromises: Promise<DocumentReference>[] = [];
      const newRatesData: Omit<RoomRate, 'id'>[] = [];

      for (let i = 0; i < numberOfDays; i++) {
        const currentDate = addDays(from, i);
        const newRatePayload: Omit<RoomRate, 'id'> = {
          roomTypeId,
          bookingChannelId,
          date: currentDate,
          rate: Number(rate),
        };
        newRatesData.push(newRatePayload);
        ratePromises.push(addRoomRate(newRatePayload));
      }

      const docRefs = await Promise.all(ratePromises);
      
      const newlyCreatedRates: RoomRate[] = docRefs.map((docRef, index) => ({
          ...newRatesData[index],
          id: docRef.id,
      }));

      toast.success(`Successfully added rates for ${numberOfDays} day(s).`);
      onRateAdded(newlyCreatedRates);
    } catch (error) {
      console.error("Error adding room rates:", error);
      toast.error("Failed to add room rates. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent onEscapeKeyDown={handleClose}>
        <DialogHeader>
          <DialogTitle>Create New Rate</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Booking Channel</Label>
                <Select value={bookingChannelId} onValueChange={setBookingChannelId} disabled={!!initialData?.bookingChannelId}>
                    <SelectTrigger>
                    <SelectValue placeholder="Select Channel" />
                    </SelectTrigger>
                    <SelectContent>
                    {bookingChannels.map(channel => (
                        <SelectItem key={channel.id} value={channel.id!}>{channel.name}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Room Type</Label>
                <Select value={roomTypeId} onValueChange={setRoomTypeId} disabled={!!initialData?.roomTypeId}>
                    <SelectTrigger>
                    <SelectValue placeholder="Select Room Type" />
                    </SelectTrigger>
                    <SelectContent>
                    {roomTypes.map(roomType => (
                        <SelectItem key={roomType.id} value={roomType.id!}>{roomType.name}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
              </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valid-from">Valid From</Label>
              <Input
                id="valid-from"
                type="date"
                disabled={!!initialData?.date}
                value={validFrom ? validFrom.toISOString().split('T')[0] : ''}
                onChange={(e) => setValidFrom(new Date(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valid-until">Valid Until</Label>
              <Input
                id="valid-until"
                type="date"
                value={validUntil ? validUntil.toISOString().split('T')[0] : ''}
                onChange={(e) => setValidUntil(new Date(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Rate</Label>
            <Input
              id="rate"
              type="number"
              placeholder="Enter rate in currency"
              value={rate}
              onChange={(e) => setRate(e.target.value === '' ? '' : parseFloat(e.target.value))}
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRateForm;
