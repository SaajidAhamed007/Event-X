import { create } from "zustand";
import { db } from "../utils/firebase";
import { collection, addDoc, setDoc, doc, deleteDoc, getDocs, getDoc, query, where, serverTimestamp, updateDoc,Timestamp, arrayUnion } from "firebase/firestore";
import { registerEmail } from "../utils/emailService";
import toast from "react-hot-toast";

export const useEventStore = create((set,get) => ({


    isLoading:true,
    events:[],
    selectedEvent:null,
    registrants:[],
    userRegistrations:[],

    getAllEvents: async () => {
      set({isLoading:true});
      try {

        const todayDate = new Date();
        todayDate.setHours(0,0,0,0)

        const q = query(collection(db,"events"),where("date",">=",Timestamp.fromDate(todayDate)))
        const querySnapshot = await getDocs(q)
        const events = querySnapshot.docs.map((doc) => ({
          id:doc.id,
          ...doc.data()
        }));
        set({events});
      } catch (error) {
        console.log(error.message)
        toast.error("Error in Loading data! refresh the page")
      } finally {
        set({isLoading:false});
      }
    },

    getEventsByCreaterId: async (uid) => {
        set({isLoading:true});
        try {
            const q = query(collection(db,"events"),where("organizer.uid","==",uid))
            const querySnapshot = await getDocs(q);
            const result = querySnapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data()
            }))
            set({events:result});
        } catch (error) {
            console.log("error",error.message)
            toast.error("Error in Loading data! refresh the page")
        } finally {
          set({isLoading:false})
        }
    },

    getEventById: async (eventId) => {
      try {
        const eventRef = doc(db,"events",eventId);
        const snapshot = await getDoc(eventRef);
        const selectedEvent = { id:snapshot.id, ...snapshot.data() }
        set({selectedEvent})
      } catch (error) {
        console.log(error.response)
        toast.error("Error in Loading data! refresh the page")
      }
    },

    addNewEvent : async (eventData,organizer) => {
      try {
        const fullData = {
          ...eventData,
          date: Timestamp.fromDate(new Date(eventData.date)),
          createdAt: Timestamp.now(),
          organizer: {
            uid: organizer.uid,
            name: organizer.name,
            email: organizer.email,
          },
          createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, "events"), fullData);
        return docRef.id;
        toast.success("Event Added Successfully")
      } catch (error) {
        console.error("Error adding event:", error);
        toast.error("Error in Adding event!")
        throw error;
      }
    },

    deleteEvent: async (id) => {
      try {
        await deleteDoc(doc(db,"events",id))
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        }));
        toast.success("EVent deleted successfully")
      } catch (error) {
        toast.error("Error in deleting the event")
        console.log(error.message)
      }
    },

    updateEvent: async (id,updatedData) => {
      try {
        if (updatedData.date && !(updatedData.date instanceof Timestamp)) {
          updatedData.date = Timestamp.fromDate(new Date(updatedData.date));
        }
        await updateDoc(doc(db,"events",id),{
          ...updatedData
        });
        set((state) => {
          events.state.events.map((event) => (
            event.id === id ? { ...event,...updatedData } : event
          ))
        })
        toast.success("Event Updated successfully");
      } catch (error) {
        console.log(error.message)
        toast.error("Error in updating event");
      }
    },

    registerForAnEvent : async (user) => {
      try {
        const selectedEvent = get().selectedEvent;
        console.log(selectedEvent.id)
        const registrantRef = doc(db, "events", selectedEvent.id, "registrants", user.uid);
        const userRegRef = doc(db, "users", user.uid,"registrations", selectedEvent.id);

        const snapshot = await getDoc(registrantRef);
        if(snapshot.exists()){
          toast.success("Already Registered!")
          return ;
        }
        await Promise.all([
          setDoc(registrantRef, {
            uid: user.uid,
            name: user.name,
            email: user.email,
            registeredAt: new Date()
          }),
          setDoc(userRegRef, {
            eventId: selectedEvent.id,
            registeredAt: new Date(),
          })
        ])

        registerEmail(selectedEvent,user)
        toast.success("Registered Successfully!");
      } catch (error) {
        console.log(error.message)
        toast.error("Error in registering!");
      }
    },

    getRegistrants : async (eventId) => {
      try {
        const registrantsRef = collection(db,"events",eventId,"registrants");
        const snapshot = await getDocs(registrantsRef);
        const registrants =  snapshot.docs.map((doc) => ({
          uid:doc.id,
          ...doc.data()
        }))
        set({registrants})
      } catch (error) {
        console.log(error)
        toast.error("Error in Loading data! refresh the page")
      }
    },
    getRegisteredEventsByUser: async (uid) => {
      try{
        const registeredEventsRef = collection(db,"users",uid,"registrations");
        const snapshot = await getDocs(registeredEventsRef);
        const userRegistrations = snapshot.docs.map((doc) => ({
          id:doc.id,
          ...doc.data()
        }))
        set({userRegistrations});
      } catch (error) {
        console.log(error.message)
      }
    }
}))