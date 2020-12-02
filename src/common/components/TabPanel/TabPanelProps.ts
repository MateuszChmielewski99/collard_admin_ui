import { TabPanelItem } from './TabPanelItem';

export type TabPanelProps = {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, value: any) => void;
  items: TabPanelItem[];
};
