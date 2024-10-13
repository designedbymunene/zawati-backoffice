import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface User {
  LoginAttempts: string;
  Permissions: { PermissionCode: string }[];
  Role: string;
  Status: string;
  UserID: string;
  UserName: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: "user-storage", // Name of the storage
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
