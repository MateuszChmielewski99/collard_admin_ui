import { EntityReference } from 'collard_admin_models';
import React, { useState } from 'react';
import AsyncAutocomplete from '../../../../common/components/AsyncAutocomplete';
import { MovieApiService } from '../../../MovieApiService';
import { useMovieContext } from '../../context/MovieState';
import { DirectorAsyncAutocompleteProps } from './DirectorAsyncAutocompleteProps';

export const DirectorAsyncAutocomplete = (
  props: DirectorAsyncAutocompleteProps
) => {
  const movieApiService = new MovieApiService();

  const [directors, setDirectors] = useState<EntityReference[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const movieContex = useMovieContext();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setIsLoading(true);

    movieApiService
      .searchDirectors(event.target.value)
      .then((resp) => {
        setDirectors(resp.data);
      })
      .finally(() => setIsLoading(false));
  };

  const isEmptyEntityRef = (value: EntityReference) =>
    value.Name === '' && value.Id === '';

  return (
    <AsyncAutocomplete<EntityReference>
      label={'Director'}
      getSelectedOption={(f, s) => f.Name === s.Name}
      onChange={(_e, v) => props.onChange(v)}
      renderItem={(item) => item.Name}
      options={directors}
      isLoading={isLoading}
      onInputChange={handleInputChange}
      inputStyle={props.inputStyle}
      required
      value={
        isEmptyEntityRef(movieContex.state.data.Director)
          ? null
          : movieContex.state.data.Director
      }
    />
  );
};
