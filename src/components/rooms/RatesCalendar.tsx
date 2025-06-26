import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getRoomTypes, RoomType } from '@/api/roomTypes';
import { RoomRate } from '@/types/roomRates';
import { addDays, startOfWeek, format, startOfDay, isEqual } from 'date-fns';
import { toast } from 'sonner';

interface RatesCalendarProps {
    rates: RoomRate[];
    selectedDate: Date;
    onSelectedDateChange: (date: Date) => void;
    onCellClick: (roomTypeId: string, date: Date) => void;
    loading: boolean;
}

const RatesCalendar: React.FC<RatesCalendarProps> = ({ rates, selectedDate, onSelectedDateChange, onCellClick, loading }) => {
    const [weekDates, setWeekDates] = useState<Date[]>([]);
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const fetchedRoomTypes = await getRoomTypes();
                setRoomTypes(fetchedRoomTypes);
            } catch (error) {
                toast.error("Failed to load room types.");
            }
        };
        fetchRoomTypes();
    }, []);

    useEffect(() => {
        const start = startOfWeek(selectedDate);
        const dates = Array.from({ length: 7 }).map((_, i) => addDays(start, i));
        setWeekDates(dates);
    }, [selectedDate]);

    const getRateForCell = (roomTypeId: string, date: Date) => {
        const rate = rates.find(r => 
            r.roomTypeId === roomTypeId && 
            isEqual(startOfDay(r.date), date)
        );
        return rate ? rate.rate.toFixed(2) : '-';
    };

    const handleCellClick = (roomTypeId: string, date: Date) => {
        const rateExists = rates.some(r => 
            r.roomTypeId === roomTypeId && 
            isEqual(startOfDay(r.date), date)
        );

        if (rateExists) {
            toast.info("A rate is already defined for this cell. To edit, please go to the Edit Rates section.");
            return;
        }

        if (date < startOfDay(new Date())) {
            toast.error("Cannot create a rate for a past date.");
            return;
        }

        onCellClick(roomTypeId, date);
    };
    
    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            onSelectedDateChange(startOfDay(date));
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="rounded-md border"
                />
            </div>
            <div className="md:col-span-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Room Type</TableHead>
                            {weekDates.map(date => (
                                <TableHead key={date.toISOString()} className="text-center">{format(date, 'EEE dd/MM')}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: roomTypes.length || 3 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                                    {Array.from({ length: 7 }).map((_, j) => (
                                        <TableCell key={j}><Skeleton className="h-6 w-full" /></TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            roomTypes.map(roomType => (
                                <TableRow key={roomType.id}>
                                    <TableCell className="font-medium">{roomType.name}</TableCell>
                                    {weekDates.map(date => (
                                        <TableCell 
                                            key={date.toISOString()} 
                                            onClick={() => handleCellClick(roomType.id!, date)}
                                            className="text-center cursor-pointer hover:bg-muted/50"
                                        >
                                            {getRateForCell(roomType.id!, date)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default RatesCalendar;
