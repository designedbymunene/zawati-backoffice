import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { GroupType } from "@/lib/types/group_type";

interface GroupState {
  selectedContent: GroupType;
  countyID: string;
  constituencyID: string;
  onChangeCounty: (countyID: string) => void;
  onChangeConstituency: (constituencyID: string) => void;
  onSelectedContent: (selectedContent: GroupType) => void;
}

const useGroupStore = create<GroupState, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      selectedContent: {} as GroupType,
      countyID: "",
      constituencyID: "",
      onChangeCounty: (countyID: string) => set(() => ({ countyID: countyID })),
      onChangeConstituency: (constituencyID: string) =>
        set(() => ({ constituencyID: constituencyID })),
      onSelectedContent: (content: GroupType) =>
        set(() => ({ selectedContent: content })),
    }),
    {
      name: "group-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGroupStore;
