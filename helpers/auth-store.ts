import { create } from "zustand";

interface AuthState {
  token: string | null;
  assigned: string | null;
  currentWindow: string | null;
  showDescription: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
  setAssigned: (assigned: string) => void;
  setCurrentWindow: (currentWindow: string) => void;
  setShowDescription: (showDescription: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token: string) => set({ token }),
  clearToken: () => set({ token: null }),
  assigned: null,
  setAssigned: (assigned: string) => set({ assigned }),
  currentWindow: "home",
  setCurrentWindow: (currentWindow: string) => set({ currentWindow }),
  showDescription: true,
  setShowDescription: (showDescription: boolean) => set({ showDescription }),
}));
