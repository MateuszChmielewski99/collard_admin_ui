import { Drawer } from '@material-ui/core';
import React from 'react';
import './menu.css';
import { NavLink } from '../../components/NavLink/NavLink';
import { menuRouteSections } from '../../routing/AppRoutes';
import { MenuDrower } from '../../components/MenuDrawer/MenuDrower';

type AppMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AppMenu = (props: AppMenuProps) => {
  return (
    <Drawer open={props.isOpen} anchor={'left'} onClose={props.onClose}>
      {menuRouteSections.map((section) => (
        <div className={'Menu_items_list'} key={section.sectionName}>
          <MenuDrower
            sectionName={section.sectionName}
            sectionItems={section.items.map((item) => (
              <NavLink
                to={item.path}
                text={item.name}
                className={'Menu_item'}
                onClick={props.onClose}
              />
            ))}
          />
        </div>
      ))}
    </Drawer>
  );
};
