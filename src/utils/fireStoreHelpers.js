import { db } from "../utils/firebase";
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";

export const addNewEvent = async (eventData,organizer) => {
  try {
    const fullData = {
      ...eventData,
      organizer: {
        uid: organizer.uid,
        name: organizer.name,
        email: organizer.email,
      },
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "events"), fullData);
    return docRef.id; // Return the ID if needed
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

export const getAllEvents = async () => {
  const eventsSnapshot = await getDocs(collection(db, "events"));
  return eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
