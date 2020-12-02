import { EntityReference } from 'collard_admin_models';

export type DirectorAsyncAutocompleteProps = {
  onChange: (value: EntityReference | null) => void;
  onBlur?: () => void;
  inputStyle: React.CSSProperties;
};
