import React, { useState } from 'react';
import { Stack } from '../Stack';
import { FileDropzone } from './Dropzone';
import { ImageList } from './ImageList';
import { RemovePhotoModal } from './remove-photo-modal';

type ImageManagerProps = {
  onImageUpload: (images: File[]) => void;
  onImageDelete: (item: string) => void;
  initiImages: string[];
  images: File[];
};

export const ImageManager = (props: ImageManagerProps) => {
  const imagesFromFiles = props.images.map((s) => URL.createObjectURL(s));
  const [selectedItem, setSelectedItem] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Stack>
      <FileDropzone onFilesDrop={props.onImageUpload} accept={'image/*'} />
      <ImageList
        images={[...props.initiImages, ...imagesFromFiles]}
        onImageDelete={(item) => {
          setIsModalOpen(true);
          setSelectedItem(item);
        }}
      />
      <RemovePhotoModal
        isOpen={isModalOpen}
        onClose={() => {
          setSelectedItem(undefined);
          setIsModalOpen(false);
        }}
        onConfirm={() => {
          props.onImageDelete(selectedItem || '');
        }}
      />
    </Stack>
  );
};
