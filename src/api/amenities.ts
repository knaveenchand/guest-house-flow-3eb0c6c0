import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Define a type for our amenity data
export interface Amenity {
  id?: string;
  name: string;
}

const amenitiesCollection = collection(db, "amenities");

// Create: Add a new amenity
export const addAmenity = (amenity: Omit<Amenity, 'id'>) => {
  return addDoc(amenitiesCollection, amenity);
};

// Read: Get all amenities
export const getAmenities = async (): Promise<Amenity[]> => {
  const snapshot = await getDocs(amenitiesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Amenity));
};

// Update: Update an amenity's information
export const updateAmenity = (id: string, amenity: Partial<Amenity>) => {
  const amenityDoc = doc(db, "amenities", id);
  return updateDoc(amenityDoc, amenity);
};

// Delete: Delete an amenity
export const deleteAmenity = (id: string) => {
  const amenityDoc = doc(db, "amenities", id);
  return deleteDoc(amenityDoc);
};
