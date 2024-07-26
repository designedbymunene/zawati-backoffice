import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type GetFunctionKeys<T> = {
  [K in keyof T]: T[K] extends ((...args: any[]) => void) ? K : never;
}[keyof T];

type OmittedFunctionKeys<T> = Omit<T, GetFunctionKeys<T>>;

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};

export interface UserState {
  user: Partial<User>;
  saveUser: (user: User) => void;
}

const initialStates: UserState = {
  user: {}, // Initialize with Partial<User>
  saveUser: () => {}, // Adjust with the actual implementation
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: initialStates.user,
        saveUser: (user) => set(() => ({ user })),
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

const useHydratedStore = <T extends keyof OmittedFunctionKeys<UserState>>(
  key: T
): OmittedFunctionKeys<UserState>[T] => {
  const [state, setState] = useState(initialStates[key]);

  const zustandState = useUserStore.getState(); // Use getState() to access the persisted state

  useEffect(() => {
    setState(zustandState[key]);
  }, [key, zustandState]);

  return state;
};

export default useHydratedStore;
