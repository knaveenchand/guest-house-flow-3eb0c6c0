import { db } from "../firebase";
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Define a type for our room data
export interface Room {
  id?: string;
  roomNumber: string;
  type: string; // e.g., "Single", "Double", "Suite"
  rate: number;
  status: "available" | "occupied" | "maintenance";
  amenities: string[];
}

const roomsCollection = collection(db, "rooms");

// Create: Add a new room
export const addRoom = (room: Omit<Room, 'id'>) => {
  return addDoc(roomsCollection, room);
};

// Read: Get all rooms
export const getRooms = async (): Promise<Room[]> => {
  const snapshot = await getDocs(roomsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room));
};

// Read: Get a single room by ID
export const getRoom = async (id: string): Promise<Room | null> => {
  const roomDoc = doc(db, "rooms", id);
  const docSnap = await getDoc(roomDoc);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Room;
  } else {
    return null;
  }
};

// Update: Update a room's information
export const updateRoom = (id: string, room: Partial<Room>) => {
  const roomDoc = doc(db, "rooms", id);
  return updateDoc(roomDoc, room);
};

// Delete: Delete a room
export const deleteRoom = (id: string) => {
  const roomDoc = doc(db, "rooms", id);
  return deleteDoc(roomDoc);
};
