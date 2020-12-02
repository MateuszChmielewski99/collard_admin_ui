import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@material-ui/lab/Autocomplete';

export type AsyncAutocompleteProps<T> = {
  renderItem: (item: T) => string;
  options: T[];
  isLoading: boolean;
  getSelectedOption: (first: T, second: T) => boolean;
  inputStyle?: React.CSSProperties;
  onChange: (
    event: React.ChangeEvent<{}>,
    value: T | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T> | undefined
  ) => void;
  label: string;
  onInputChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  value?: T | null;
  inputProps?: any;
  disabled?: boolean;
  required?: boolean;
};
