import React from 'react';

type ImageItemProps = {
  src: string;
};

const style: React.CSSProperties = {
  boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)',
  transform:'scale(0.9)',
  width:300,
  height:'auto'
};

export const ImageItem = (props: ImageItemProps) => {
  return <img style={{ ...style }} src={props.src}></img>
};


