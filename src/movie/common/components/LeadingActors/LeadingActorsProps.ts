import { EntityReference } from 'collard_admin_models';

export type LeadingActorsProps = {
  data: EntityReference[];
  onChange: (value: EntityReference | null) => void;
  onDelete: (id: string) => void;
  onAdd: (value: EntityReference | null) => void;
  errorMessage: string;
  maxItems?: number;
};
