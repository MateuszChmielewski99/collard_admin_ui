import React from 'react';
import { ReactNode } from 'react';
import { Paper } from '@material-ui/core';
import './main-section-styles.css';

type MainSectionProps = {
  children: ReactNode | ReactNode[];
};

export const MainSection = (props: MainSectionProps) => {
  return (
    <Paper className={'MainSection'} elevation={3}>
      {props.children}
    </Paper>
  );
};
