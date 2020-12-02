import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { useAuthContext } from '../../../auth/context/AuthContext';
import { Stack } from '../../components/Stack';
import { AppMenu } from '../menu/menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logOutButton:{
    color:'white',
  }
}));

export const AppHeader = () => {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authContext = useAuthContext();

  return (
    <AppBar position="static" style={{ zIndex: 1000 }}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => {
            setIsMenuOpen(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Collard Admin
        </Typography>
        <Stack flex={1}></Stack>
        <Button className={classes.logOutButton} onClick={authContext.signOut}>Sign out</Button>
      </Toolbar>
      <AppMenu
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
        }}
      />
    </AppBar>
  );
};
