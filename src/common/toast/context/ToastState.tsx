import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import { toastReducer } from './ToastReducer';

export type ToastState = {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error';
};

const initState: ToastState = {
  isOpen: false,
  message: '',
  type: 'success',
};

const ToastContext = createContext<{
  show: (type: 'success' | 'error', message: string) => void;
  close: () => void;
  state: ToastState;
} | null>(null);

export const useToastContext = () => {
  const ctx = useContext(ToastContext);

  if (ctx === null || ctx === undefined) {
    throw new Error('Toast context must be used within toast provider!');
  }

  return ctx;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [state, send] = useReducer(toastReducer, initState);

  const show = (type: 'success' | 'error', message: string) => {
    send({
      type: 'OPEN',
      alertType: type,
      message,
    });
  };

  const close = () => {
    send({
      type: 'CLOSE',
    });
  };

  return (
    <ToastContext.Provider value={{ show, state, close }}>
      {children}
    </ToastContext.Provider>
  );
};
