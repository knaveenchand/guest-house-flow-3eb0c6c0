import { db } from "@/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, DocumentReference } from "firebase/firestore";
import { startOfDay } from 'date-fns';
import { RoomRate } from "@/types/roomRates";

const roomRatesCollection = collection(db, "roomRates");

// Create: Add a new room rate
export const addRoomRate = (roomRate: Omit<RoomRate, 'id'>): Promise<DocumentReference> => {
    return addDoc(roomRatesCollection, roomRate);
}

// Read: Get all room rates
export const getRoomRates = async (): Promise<RoomRate[]> => {
    const snapshot = await getDocs(roomRatesCollection);
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            date: data.date.toDate(), // Convert Firestore Timestamp to JS Date
        } as RoomRate;
    });
}

// Read: Get room rates for a specific booking channel, then filter by date range on the client
export const getRoomRatesByChannelAndDateRange = async (bookingChannelId: string, startDate: Date, endDate: Date): Promise<RoomRate[]> => {
    if (!bookingChannelId) {
        return []; // Return empty array if no channel is selected
    }
    
    // Query only by the booking channel ID to avoid needing a composite index
    const q = query(
        roomRatesCollection,
        where("bookingChannelId", "==", bookingChannelId)
    );
    
    const snapshot = await getDocs(q);
    
    const allRatesForChannel = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            roomTypeId: data.roomTypeId,
            bookingChannelId: data.bookingChannelId,
            date: data.date.toDate(), // Convert Firestore Timestamp to JS Date
            rate: data.rate
        } as RoomRate;
    });

    // Perform the date filtering on the client side
    const start = startOfDay(startDate);
    const end = startOfDay(endDate);

    const filteredRates = allRatesForChannel.filter(rate => {
        const rateDate = startOfDay(rate.date);
        return rateDate >= start && rateDate <= end;
    });
    
    return filteredRates;
}

// Update: Update a room rate
export const updateRoomRate = (id: string, roomRate: Partial<RoomRate>) => {
    const roomRateDoc = doc(db, "roomRates", id);
    return updateDoc(roomRateDoc, roomRate);
}

// Delete: Delete a room rate
export const deleteRoomRate = (id: string) => {
    const roomRateDoc = doc(db, "roomRates", id);
    return deleteDoc(roomRateDoc);
}
