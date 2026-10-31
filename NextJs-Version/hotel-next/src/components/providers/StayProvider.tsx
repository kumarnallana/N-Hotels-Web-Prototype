"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ROOM_TYPES, STAY_CYCLE } from "@/lib/hotel";
import { addIsoDays, nightsBetween, todayIso } from "@/lib/enquiry";

interface StayState {
  roomName: string;
  checkIn: string;
  checkOut: string;
  slot: string;
  guests: string;
  nights: number;
  setRoomName: (name: string) => void;
  setCheckIn: (iso: string) => void;
  setCheckOut: (iso: string) => void;
  setSlot: (slot: string) => void;
  setGuests: (guests: string) => void;
}

const today = todayIso();

/**
 * The booking strip and the enquiry form are two views of one decision. In
 * the prototype they were two independent sets of inputs, so changing the
 * date at the top silently disagreed with the total at the bottom. One
 * provider, one truth.
 */
const StayContext = createContext<StayState | null>(null);

export function StayProvider({ children }: { children: ReactNode }) {
  const [roomName, setRoomName] = useState<string>(ROOM_TYPES[0].name);
  const [checkIn, setCheckInState] = useState<string>(addIsoDays(today, 4));
  const [checkOut, setCheckOutState] = useState<string>(addIsoDays(today, 6));
  const [slot, setSlot] = useState<string>(STAY_CYCLE.slots[0].value);
  const [guests, setGuests] = useState<string>("2 Adults");

  // Never allow a check-out that is not strictly after check-in; the
  // prototype let you submit a zero-night stay and then showed ₹0.
  const setCheckIn = useCallback((iso: string) => {
    setCheckInState(iso);
    setCheckOutState((current) => (current > iso ? current : addIsoDays(iso, 1)));
  }, []);

  const setCheckOut = useCallback(
    (iso: string) => {
      setCheckOutState((current) => (iso > checkIn ? iso : current));
    },
    [checkIn],
  );

  const value = useMemo<StayState>(
    () => ({
      roomName,
      checkIn,
      checkOut,
      slot,
      guests,
      nights: nightsBetween(checkIn, checkOut),
      setRoomName,
      setCheckIn,
      setCheckOut,
      setSlot,
      setGuests,
    }),
    [roomName, checkIn, checkOut, slot, guests, setCheckIn, setCheckOut],
  );

  return <StayContext.Provider value={value}>{children}</StayContext.Provider>;
}

export function useStay(): StayState {
  const context = useContext(StayContext);
  if (!context) throw new Error("useStay must be used inside <StayProvider>");
  return context;
}
