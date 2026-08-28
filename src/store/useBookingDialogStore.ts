import { create } from "zustand";

interface BookingDialogState {
  open: boolean;
  /** Pre-selected appliance when opened from a service card */
  appliance?: string;
  openDialog: (appliance?: string) => void;
  closeDialog: () => void;
  setOpen: (open: boolean) => void;
}

export const useBookingDialogStore = create<BookingDialogState>()((set) => ({
  open: false,
  appliance: undefined,
  openDialog: (appliance) => set({ open: true, appliance }),
  closeDialog: () => set({ open: false }),
  setOpen: (open) => set({ open }),
}));
