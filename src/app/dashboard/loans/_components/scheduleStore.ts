import { create } from "zustand";

interface ScheduleState {
  selectedGroup: string;
  onSelectedGroup: (selectedGroup: string) => void;
  reference: string;
  onSelectedReference: (reference: string) => void;
}

const useScheduleStore = create<ScheduleState>((set) => ({
  selectedGroup: "",
  onSelectedGroup: (content: string) =>
    set((state) => ({ selectedGroup: content })),
  reference: "",
  onSelectedReference: (content: string) =>
    set((state) => ({ reference: content })),

}));

export default useScheduleStore;
