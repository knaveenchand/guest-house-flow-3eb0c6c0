import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RatesCalendar from '@/components/rooms/RatesCalendar';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AddRateForm from '@/components/rooms/AddRateForm';
import { getRoomRatesByChannelAndDateRange } from '@/api/roomRates';
import { getBookingChannels, BookingChannel } from '@/api/bookingChannels';
import { RoomRate } from '@/types/roomRates';
import { toast } from 'sonner';
import { startOfWeek, endOfWeek, startOfDay } from 'date-fns';

const RoomsRatesPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [initialFormData, setInitialFormData] = useState<Partial<RoomRate> | undefined>(undefined);
    const [bookingChannels, setBookingChannels] = useState<BookingChannel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<string>('');
    const [rates, setRates] = useState<RoomRate[]>([]);
    const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const channels = await getBookingChannels();
                setBookingChannels(channels);
                if (channels.length > 0) {
                    setSelectedChannel(channels[0].id!);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                toast.error("Failed to load booking channels.");
                setLoading(false);
            }
        };
        fetchChannels();
    }, []);

    useEffect(() => {
        if (!selectedChannel) return;

        const fetchRates = async () => {
            setLoading(true);
            const startDate = startOfWeek(selectedDate);
            const endDate = endOfWeek(selectedDate);
            try {
                const fetchedRates = await getRoomRatesByChannelAndDateRange(selectedChannel, startDate, endDate);
                setRates(fetchedRates);
            } catch (error) {
                console.error("Error fetching rates:", error);
                toast.error("An unexpected error occurred while fetching rates.");
            } finally {
                setLoading(false);
            }
        };
        fetchRates();
    }, [selectedChannel, selectedDate]);

    const handleAddRateClick = () => {
        setInitialFormData({ bookingChannelId: selectedChannel });
        setIsFormOpen(true);
    };
    
    const handleCellClick = (roomTypeId: string, date: Date) => {
        setInitialFormData({ roomTypeId, date, bookingChannelId: selectedChannel });
        setIsFormOpen(true);
    };

    const handleRateAdded = (newRates: RoomRate[]) => {
        const startDate = startOfWeek(selectedDate);
        const endDate = endOfWeek(selectedDate);
        const relevantNewRates = newRates.filter(rate => {
            const rateDate = startOfDay(rate.date);
            return rateDate >= startDate && rateDate <= endDate && rate.bookingChannelId === selectedChannel;
        });

        if (relevantNewRates.length > 0) {
            setRates(prevRates => [...prevRates, ...relevantNewRates]);
        }
        setIsFormOpen(false);
    }

    return (
        <Layout>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Room Rates</h1>
                    <div className="flex gap-2">
                        <Button onClick={handleAddRateClick} disabled={!selectedChannel}>Create a New Rate</Button>
                        <Button asChild>
                            <Link to="/rooms/setup">Go back to Setup page</Link>
                        </Button>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Your Room Rates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {bookingChannels.length === 0 && !loading ? (
                            <p>No booking channels found. Please create one in the setup page.</p>
                        ) : (
                            <Tabs value={selectedChannel} onValueChange={setSelectedChannel}>
                                <TabsList>
                                    {bookingChannels.map(channel => (
                                        <TabsTrigger key={channel.id} value={channel.id!}>
                                            {channel.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                <TabsContent value={selectedChannel} forceMount>
                                     <RatesCalendar
                                        rates={rates}
                                        selectedDate={selectedDate}
                                        onSelectedDateChange={setSelectedDate}
                                        onCellClick={handleCellClick}
                                        loading={loading}
                                    />
                                </TabsContent>
                            </Tabs>
                        )}
                    </CardContent>
                </Card>
            </div>
            {isFormOpen && (
                <AddRateForm 
                    isOpen={isFormOpen}
                    setIsOpen={setIsFormOpen}
                    initialData={initialFormData}
                    onRateAdded={handleRateAdded}
                />
            )}
        </Layout>
    );
};

export default RoomsRatesPage;
