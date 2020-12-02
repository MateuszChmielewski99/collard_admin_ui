import React from 'react';
import {
  NavLink as ReactNavLink,
  NavLinkProps as ReactNavLinkProps,
} from 'react-router-dom';
import './nav.css';

type NavLinkProps = React.PropsWithoutRef<ReactNavLinkProps> &
  React.RefAttributes<HTMLAnchorElement> & {
    disabled?: boolean;
    text: string;
  };

export const NavLink = (props: NavLinkProps) => {
  const navLinkClassName = props.className ? `Nav ${props.className}` : 'Nav';
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (props.disabled) event.preventDefault();
    props.onClick && props.onClick(event);
  };
  return (
    <ReactNavLink
      to={props.to}
      className={navLinkClassName}
      onClick={handleClick}
    >
      {props.text}{' '}
    </ReactNavLink>
  );
};
