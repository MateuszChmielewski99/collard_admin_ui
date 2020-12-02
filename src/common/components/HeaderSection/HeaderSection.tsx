import React from 'react';
import { Stack } from '../Stack';
import './header-section.css';

type HeaderSectionProps = {
  title: string;
  ctaItems: JSX.Element | JSX.Element[];
};

export const HeaderSection = (props: HeaderSectionProps) => {
  const ctaItemsList = Array.isArray(props.ctaItems)
    ? props.ctaItems
    : [props.ctaItems];
  return (
    <Stack horizontal className={'HeaderSection'}>
      {props.title}
      <Stack flex={1}></Stack>
      <Stack horizontal>
        {ctaItemsList.map((item, index) => (
          <Stack
            key={`cta-${index}`}
            className={'HeaderSectionCtaItems'}
          >
            {item}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
