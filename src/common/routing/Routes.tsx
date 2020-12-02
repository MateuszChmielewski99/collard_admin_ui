import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { appRoutes } from './AppRoutes';

export const Routes = () => {
  return (
    <Switch>
      {appRoutes.map((item) => (
        <Route
          path={item.path}
          key={item.key}
          component={item.component}
          exact={item.exact}
        />
      ))}
    </Switch>
  );
};
