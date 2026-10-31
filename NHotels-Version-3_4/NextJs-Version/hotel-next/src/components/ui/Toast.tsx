"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2 } from "lucide-react";

interface ToastApi {
  show: (message: string) => void;
}

const ToastContext = createContext<ToastApi>({ show: () => {} });

export const useToast = (): ToastApi => useContext(ToastContext);

/**
 * One toast host for the whole page. Auto-dismisses, and the timer is cleared
 * on unmount so a toast cannot fire into an unmounted tree.
 *
 * It sits above the mobile action bar rather than under it, because on a phone
 * that bar is the bottom of the screen and would hide the message.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((next: string) => {
    if (timer.current) clearTimeout(timer.current);
    setMessage(next);
    timer.current = setTimeout(() => setMessage(null), 4200);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const api = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {message && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] z-110 flex justify-center px-4 sm:bottom-8">
          <p
            role="status"
            aria-live="polite"
            className="pointer-events-auto flex max-w-md items-start gap-2.5 rounded-card border border-line-night bg-night px-4 py-3 text-small font-medium text-on-night shadow-[var(--shadow-raise)]"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
            <span>{message}</span>
          </p>
        </div>
      )}
    </ToastContext.Provider>
  );
}
