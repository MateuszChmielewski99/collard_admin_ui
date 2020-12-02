export type RemovePhotoModalProps = {
    isOpen:boolean,
    onClose:() => void;
    onConfirm:() => void;
    onCancel?:() => void;
}