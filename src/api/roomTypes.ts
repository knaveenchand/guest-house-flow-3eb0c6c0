import { db } from "../firebase";
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Amenity } from "./amenities";

// Define a type for our room type data
export interface RoomType {
  id?: string;
  name: string;
  description: string;
  color: string;
  roomNumbers: string[];
  amenities: Amenity[];
  maxGuests: number;
  rates: { [bookingChannelId: string]: number };
}

const roomTypesCollection = collection(db, "roomTypes");

// Create: Add a new room type
export const addRoomType = (roomType: Omit<RoomType, 'id'>) => {
  return addDoc(roomTypesCollection, roomType);
};

// Read: Get all room types
export const getRoomTypes = async (): Promise<RoomType[]> => {
  const snapshot = await getDocs(roomTypesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RoomType));
};

// Read: Get a single room type by ID
export const getRoomType = async (id: string): Promise<RoomType | null> => {
  const roomTypeDoc = doc(db, "roomTypes", id);
  const docSnap = await getDoc(roomTypeDoc);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as RoomType;
  } else {
    return null;
  }
};

// Update: Update a room type's information
export const updateRoomType = (id: string, roomType: Partial<RoomType>) => {
  const roomTypeDoc = doc(db, "roomTypes", id);
  return updateDoc(roomTypeDoc, roomType);
};

// Delete: Delete a room type
export const deleteRoomType = (id: string) => {
  const roomTypeDoc = doc(db, "roomTypes", id);
  return deleteDoc(roomTypeDoc);
};
