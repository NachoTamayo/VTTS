import { create } from "zustand";
import { TestPssSystemProps } from "@/helpers/interfaces";

interface dataState {
  srNumber: string | null;
  setSrNumber: (srNumber: string) => void;
  clearSrNumber: () => void;
  testPssSystem: TestPssSystemProps[];
  setTestPssSystem: (testPssSystem: TestPssSystemProps[]) => void;
}

export const useDataStore = create<dataState>((set) => ({
  srNumber: null,
  setSrNumber: (srNumber: string) => set({ srNumber }),
  clearSrNumber: () => set({ srNumber: null }),
  testPssSystem: [],
  setTestPssSystem: (testPssSystem: TestPssSystemProps[]) => set({ testPssSystem }),
}));
