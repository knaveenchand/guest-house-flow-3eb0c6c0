import { db } from "../firebase";
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Define a type for our guest data for better type-safety
export interface Guest {
  id?: string; // Optional: ID will be assigned by Firestore
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

const guestsCollection = collection(db, "guests");

// Create: Add a new guest to the "guests" collection
export const addGuest = (guest: Omit<Guest, 'id'>) => {
  return addDoc(guestsCollection, guest);
};

// Read: Get all guests from the "guests" collection
export const getGuests = async (): Promise<Guest[]> => {
  const snapshot = await getDocs(guestsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Guest));
};

// Read: Get a single guest by their ID
export const getGuest = async (id: string): Promise<Guest | null> => {
  const guestDoc = doc(db, "guests", id);
  const docSnap = await getDoc(guestDoc);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Guest;
  } else {
    return null;
  }
};

// Update: Update a guest's information
export const updateGuest = (id: string, guest: Partial<Guest>) => {
  const guestDoc = doc(db, "guests", id);
  return updateDoc(guestDoc, guest);
};

// Delete: Delete a guest from the "guests" collection
export const deleteGuest = (id: string) => {
  const guestDoc = doc(db, "guests", id);
  return deleteDoc(guestDoc);
};
