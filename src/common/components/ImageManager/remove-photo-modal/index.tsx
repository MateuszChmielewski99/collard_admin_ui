import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { RemovePhotoModalProps } from './RemovePhotoModalProps';

export const RemovePhotoModal = (props:RemovePhotoModalProps) => {
    return <Dialog open={props.isOpen}>
        <DialogTitle>
            Are you sure?
        </DialogTitle>
        <DialogContent>
            Are you sure you want to delete this image?
        </DialogContent>
        <DialogActions>
        <Button onClick={() => {
            props.onCancel && props.onCancel();
            props.onClose(); 
        }} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => {
              props.onConfirm();
              props.onClose();
          }} color="primary">
            Confirm
          </Button>
        </DialogActions>
    </Dialog>
}