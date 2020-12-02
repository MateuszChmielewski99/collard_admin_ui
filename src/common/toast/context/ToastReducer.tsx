import produce from 'immer';
import { ToastEvent } from './ToastEvents';
import { ToastState } from './ToastState';

export const toastReducer = produce((draft: ToastState, event: ToastEvent) => {
  switch (event.type) {
    case 'OPEN':
      draft.type = event.alertType;
      draft.message = event.message;
      draft.isOpen = true;
      break;
    case 'CLOSE':
      draft.isOpen = false;
      break;
    default:
      throw new Error('Invalid event type');
  }
});
