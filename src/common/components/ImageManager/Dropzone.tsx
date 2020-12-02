import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type FileDropzoneProps = {
  onFilesDrop: (files: File[]) => void;
  accept?: string;
};

export const FileDropzone = (props: FileDropzoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    props.onFilesDrop(acceptedFiles);
  }, [props]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop images here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
