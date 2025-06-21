import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Define a type for our booking channel data
export interface BookingChannel {
  id?: string;
  name: string;
  commission?: number;
  paymentType?: string;
}

const bookingChannelsCollection = collection(db, "bookingChannels");

// Create: Add a new booking channel
export const addBookingChannel = (channel: Omit<BookingChannel, 'id'>) => {
  return addDoc(bookingChannelsCollection, channel);
};

// Read: Get all booking channels
export const getBookingChannels = async (): Promise<BookingChannel[]> => {
  const snapshot = await getDocs(bookingChannelsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookingChannel));
};

// Update: Update a booking channel's information
export const updateBookingChannel = (id: string, channel: Partial<BookingChannel>) => {
  const channelDoc = doc(db, "bookingChannels", id);
  return updateDoc(channelDoc, channel);
};

// Delete: Delete a booking channel
export const deleteBookingChannel = (id: string) => {
  const channelDoc = doc(db, "bookingChannels", id);
  return deleteDoc(channelDoc);
};
