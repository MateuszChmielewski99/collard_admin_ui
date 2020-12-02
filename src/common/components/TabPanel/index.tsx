import { Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { TabPanelProps } from './TabPanelProps';

const TabPanel = (props: TabPanelProps) => {
  const getWidth = () => {
    return (100 / props.items.length).toFixed(0) + '%';
  };
  return (
    <Tabs
      value={props.value}
      onChange={props.onChange}
      style={{ width: '100%', color: '#282c34', zIndex: 0 }}
      indicatorColor="primary"
    >
      {props.items.map((item) => (
        <Tab
          key={item.key}
          label={item.sectionName}
          style={{ width: getWidth() }}
        />
      ))}
    </Tabs>
  );
};

export default TabPanel;
