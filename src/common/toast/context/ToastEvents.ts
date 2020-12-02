interface ShowToastEvent {
  type: 'OPEN';
  message: string;
  alertType: 'success' | 'error';
}

interface HideToastEvent {
  type: 'CLOSE';
}

export type ToastEvent = ShowToastEvent | HideToastEvent;
