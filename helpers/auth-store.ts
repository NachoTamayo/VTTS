import { create } from "zustand";

interface AuthState {
  token: string | null;
  assigned: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  setAssigned: (assigned: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token: string) => set({ token }),
  clearToken: () => set({ token: null }),
  assigned: null,
  setAssigned: (assigned: string) => set({ assigned }),
}));
