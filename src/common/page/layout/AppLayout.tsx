import React, { ReactNode } from 'react';
import { AppHeader } from '../header/header';
import { StickyContainer, Sticky } from 'react-sticky';
import './layout.css';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useToastContext } from '../../toast/context/ToastState';
type AppLayoutProps = {
  children: ReactNode | ReactNode[];
};

export const AppLayout = (props: AppLayoutProps) => {
  const toastContext = useToastContext();
  return (
    <StickyContainer>
      <Sticky>
        {({ style }) => (
          <div style={{ ...style, zIndex:999 }}>
            <AppHeader />
          </div>
        )}
      </Sticky>
      <div className={'main'}>{props.children}</div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={toastContext.state.isOpen}
        onClose={() => toastContext.close()}
        autoHideDuration={2000}
      >
        <Alert severity={toastContext.state.type}>
          {toastContext.state.message}
        </Alert>
      </Snackbar>
    </StickyContainer>
  );
};
