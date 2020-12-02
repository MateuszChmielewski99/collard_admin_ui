import { CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { AsyncAutocompleteProps } from './AsyncAutocompleteProps';

const AsyncAutocomplete = <T extends {}>(props: AsyncAutocompleteProps<T>) => {
  return (
    <Autocomplete
      getOptionSelected={props.getSelectedOption}
      getOptionLabel={props.renderItem}
      options={props.options}
      loading={props.isLoading}
      value={props.value}
      disabled={props.disabled}
      onChange={props.onChange}
      style={{
        width: '100%',
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props.inputProps}
          required
          label={props.label}
          InputLabelProps={{
            style: {
              marginLeft: 8,
              paddingBottom: 4,
            },
          }}
          variant="standard"
          InputProps={{
            ...params.InputProps,
            style: props.inputStyle,
            onChange: props.onInputChange,
            endAdornment: (
              <>
                {props.isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AsyncAutocomplete;
