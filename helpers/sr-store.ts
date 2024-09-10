import { create } from "zustand";
import { ServiceRequestProps } from "@/helpers/interfaces";

interface SRState {
  srNumber: string | null;
  setSrNumber: (srNumber: string) => void;
  clearSrNumber: () => void;
  serviceRequest: ServiceRequestProps | null;
  setServiceRequest: (serviceRequest: ServiceRequestProps) => void;
}

export const useSRStore = create<SRState>((set) => ({
  srNumber: null,
  setSrNumber: (srNumber: string) => set({ srNumber }),
  clearSrNumber: () => set({ srNumber: null }),
  serviceRequest: null,
  setServiceRequest: (serviceRequest: ServiceRequestProps) => set({ serviceRequest }),
}));
