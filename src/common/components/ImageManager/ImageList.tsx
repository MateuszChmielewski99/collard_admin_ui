import React from 'react';
import { Stack } from '../Stack';
import { ImageItem } from './SingleImage';
import ClearIcon from '@material-ui/icons/Clear';
import { useTheme } from '@material-ui/core';

type ImageListProps = {
  images: string[];
  onImageDelete: (item: string, index:number) => void;
};

export const ImageList = (props: ImageListProps) => {
  const theme = useTheme();
  return (
    <Stack horizontal flexWrap={'wrap'}>
      {props.images.map((item, index) => (
        <Stack key={`${item}${index}`}>
          <ClearIcon
            onClick={() => props.onImageDelete(item,index)}
            style={{
              color: theme.palette.primary.main,
              cursor: 'pointer',
              alignSelf: 'flex-end',
            }}
          />
          <ImageItem src={item} />
        </Stack>
      ))}
    </Stack>
  );
};
