import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  CreateMovieRequest,
  EntityReference,
  validateCreateMovieRequest,
} from 'collard_admin_models';
import React, { useEffect, useState } from 'react';
import { MainSection } from '../../common/components/layout/MainSection';
import { Stack } from '../../common/components/Stack';
import { createErrorMessage } from '../../common/helpers/errorMessage.factory';
import { useToastContext } from '../../common/toast/context/ToastState';
import { useMovieContext } from '../common/context/MovieState';
import { MovieApiService } from '../MovieApiService';

const MovieAditionalInfo = () => {
  const movieApiService = new MovieApiService();
  const movieContext = useMovieContext();
  const toastContext = useToastContext();
  const [countries, setCountries] = useState<EntityReference[]>([]);
  const [languages, setLanguages] = useState<EntityReference[]>([]);

  useEffect(() => {
    fetchCountries();
    fetchLanguages();
  }, []);

  const fetchCountries = () => {
    movieApiService
      .fetchCountries()
      .then((resp) => setCountries(resp.data))
      .catch(() =>
        toastContext.show('error', 'Error while fatching countries')
      );
  };

  const fetchLanguages = () => {
    movieApiService
      .fetchLanguages()
      .then((resp) => setLanguages(resp.data))
      .catch(() =>
        toastContext.show('error', 'Error while fatching countries')
      );
  };

  const handleFieldBlur = (fieldName: keyof CreateMovieRequest) => {
    const validationResult = validateCreateMovieRequest(
      movieContext.state.data
    );
    const nameErrors = validateCreateMovieRequest.errors
      ?.map((s) => createErrorMessage(s))
      .filter((s) => s?.property === fieldName);

    movieContext.setIsVald(validationResult as boolean);

    if (!nameErrors?.length) {
      movieContext.setFieldErrorMessage(fieldName, '');
      return;
    }

    movieContext.setFieldErrorMessage(
      fieldName,
      nameErrors.pop()?.errorMessage || ''
    );
  };

  return (
    <Stack style={{ width: '100%' }}>
      <MainSection>
        <span
          style={{
            font: 'bold',
            fontSize: '2rem',
          }}
        >
          Additional info
        </span>
        <Stack alignItems={'space-between'} style={{ padding: 16 }}>
          <Autocomplete
            options={countries}
            getOptionLabel={(option) => option.Name}
            onChange={(_e, v) => {
              if (v) movieContext.setOriginalCountr(v);
            }}
            onBlur={() => handleFieldBlur('OriginalCountry')}
            value={movieContext.state.data.OriginalCountry}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Oryginal Country"
                variant="standard"
                error={movieContext.state.validity.OriginalCountry !== ''}
                helperText={movieContext.state.validity.OriginalCountry}
              />
            )}
          />
          <Autocomplete
            options={languages}
            style={{ marginTop: 10 }}
            getOptionLabel={(option) => option.Name}
            onBlur={() => handleFieldBlur('OriginalLanguage')}
            value={movieContext.state.data.OriginalLanguage}
            onChange={(_e, v) => {
              if (v) movieContext.setOriginalLanguages(v);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Oryginal Language"
                variant="standard"
                error={movieContext.state.validity.OriginalLanguage !== ''}
                helperText={movieContext.state.validity.OriginalLanguage}
              />
            )}
          />
        </Stack>
      </MainSection>
    </Stack>
  );
};

export default MovieAditionalInfo;
