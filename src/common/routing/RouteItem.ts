import { FunctionComponent } from 'react';

export type RouteItem = {
  key: string;
  path: string;
  component: FunctionComponent;
  name: string;
  exact?: boolean;
};
