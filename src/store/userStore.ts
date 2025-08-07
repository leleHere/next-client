import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
