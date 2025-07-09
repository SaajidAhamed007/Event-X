import { create } from "zustand";

export const useUIStore = create((set) => ({
    triggerFocus:false,
    setTriggerFocus: (value) => set({triggerFocus:value})
}))