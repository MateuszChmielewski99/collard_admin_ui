import React from 'react';
import { Stack } from '../../common/components/Stack';
import { useAuthContext } from '../context/AuthContext';
import BlockIcon from '@material-ui/icons/Block';
import './index.css';
import { Button } from '@material-ui/core';

export const Unauthorized = () => {
  const authContext = useAuthContext();

  return (
    <Stack horizontal className={'unauth_container'}>
      <BlockIcon
        style={{ color: 'rgb(182, 0, 0)', width: '30%', height: '30%' }}
      />
      <Stack className="unauth_info">
        <p> You are not allowed to see this site's content.</p>
        <p>Please log in</p>
        <Button
          onClick={authContext.signIn}
          variant={'text'}
          className={'sing_in_button'}
          style={{ color: '#3f51b5' }}
        >
          Sign in
        </Button>
      </Stack>
    </Stack>
  );
};
