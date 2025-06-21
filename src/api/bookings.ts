import { db } from "../firebase";
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Guest } from "./guests";
import { Room } from "./rooms";

// Define a type for our booking data
export interface Booking {
  id?: string;
  guest: Guest;
  room: Room;
  checkInDate: Date;
  checkOutDate: Date;
  totalAmount: number;
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled";
}

const bookingsCollection = collection(db, "bookings");

// Create: Add a new booking
export const addBooking = (booking: Omit<Booking, 'id'>) => {
  return addDoc(bookingsCollection, booking);
};

// Read: Get all bookings
export const getBookings = async (): Promise<Booking[]> => {
  const snapshot = await getDocs(bookingsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
};

// Read: Get a single booking by ID
export const getBooking = async (id: string): Promise<Booking | null> => {
  const bookingDoc = doc(db, "bookings", id);
  const docSnap = await getDoc(bookingDoc);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Booking;
  } else {
    return null;
  }
};

// Update: Update a booking's information
export const updateBooking = (id: string, booking: Partial<Booking>) => {
  const bookingDoc = doc(db, "bookings", id);
  return updateDoc(bookingDoc, booking);
};

// Delete: Delete a booking
export const deleteBooking = (id: string) => {
  const bookingDoc = doc(db, "bookings", id);
  return deleteDoc(bookingDoc);
};
