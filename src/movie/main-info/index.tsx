import React, { useState } from 'react';
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Stack } from '../../common/components/Stack';
import { MainSection } from '../../common/components/layout/MainSection';
import { GenresData } from '../common/context/MovieEvents';
import {
  CreateMovieRequest,
  EntityReference,
  Genres,
  validateCreateMovieRequest,
} from 'collard_admin_models';
import { createErrorMessage } from '../../common/helpers/errorMessage.factory';
import { getYearOptions } from '../../common/helpers/generateYears';
import { useMovieContext } from '../common/context/MovieState';
import { DirectorAsyncAutocomplete } from '../common/components/DirectorAsyncAutocomplete/DirectorAsyncAutocomplete';
import { MovieMainInfoProps } from './MovieInfoProps';
import './movie-add-info.css';

export const MovieMainInfo = (props: MovieMainInfoProps) => {
  const allGenres = [...Object.values(Genres),'Adventure'];
  const years = getYearOptions();
  const movieContext = useMovieContext();
  const [title, setTitle] = useState(movieContext.state.data.Name);
  const [year, setYear] = useState<number | undefined>(
    movieContext.state.data.Year || undefined
  );
  const [imdbScore, setImdbScore] = useState<number | undefined>(
    movieContext.state.data.ImdbScore || undefined
  );
  const [imdbLink, setImdbLink] = useState(movieContext.state.data.ImdbLink);

  const getGenresInitialData = () => {
    return movieContext.state.data.Genres.length
      ? ((movieContext.state.data.Genres as any) as GenresData)
      : undefined;
  };

  const [genres, setGenres] = useState<GenresData | undefined>(
    getGenresInitialData()
  );

  const inputStyles: React.CSSProperties = {
    margin: '8px',
    width: '300px',
    boxSizing:'border-box'
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTitle(event.target.value);
  };

  const handleGenresChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setGenres(event.target.value as GenresData);
  };

  const handleFieldBlur = (
    fieldName: keyof CreateMovieRequest,
    value: string | number | EntityReference | undefined | GenresData,
    setContextValue: () => void
  ) => {
    const updated: CreateMovieRequest = { ...movieContext.state.data };
    (updated[fieldName] as typeof value) = value;
    setContextValue();

    const validationResult = validateCreateMovieRequest(updated);
    movieContext.setIsVald(validationResult as boolean);

    const nameErrors = validateCreateMovieRequest.errors
      ?.map((s) => createErrorMessage(s))
      .filter((s) => s?.property === fieldName);

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
    <Stack>
      <MainSection>
        <span className={'movie_add_info--main_info__title'}> Main info </span>
        <Stack horizontal>
            <Stack flex={1} style={{flexBasis:'100%'}} justifyContent={'space-between'}>
              <TextField
                label={'Title'}
                onBlurCapture={() => {
                  movieContext.setName(title);
                }}
                required
                style={inputStyles}
                margin="dense"
                onChange={handleTitleChange}
                value={title}
                onBlur={() => {
                  handleFieldBlur('Name', title, () =>
                    movieContext.setName(title)
                  );
                }}
                error={movieContext.state.validity.Name !== ''}
                helperText={movieContext.state.validity.Name}
                disabled={props.isNameDisabled}
              />
              <Autocomplete
                options={years}
                getOptionLabel={(y) => y.toString()}
                style={inputStyles}
                value={year}
                onBlur={() =>
                  handleFieldBlur('Year', year, () =>
                    movieContext.setYear(year || new Date().getFullYear())
                  )
                }
                onChange={(e: any, value: number | null) =>
                  value && setYear(value)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Year" required />
                )}
              />
              <TextField
                type={'number'}
                label={'IMDB Score'}
                margin={'dense'}
                style={inputStyles}
                value={imdbScore}
                onBlur={() =>
                  handleFieldBlur('ImdbScore', imdbScore, () => {
                    movieContext.setImdbScore(imdbScore || 0);
                  })
                }
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => {
                  const parsed = Number.parseFloat(event.target.value);
                  if (parsed < 0) return;
                  setImdbScore(parsed);
                }}
                required
              />
            </Stack>
            <Stack flex={1} style={{flexBasis:'100%'}} justifyContent={'space-between'}>
              <FormControl style={inputStyles} required>
                <InputLabel
                  id="genres-select-label"
                  error={movieContext.state.validity.Genres !== ''}
                >
                  Genres
                </InputLabel>
                <Select
                  labelId={'genres-select-label'}
                  multiple
                  value={genres || []}
                  onChange={handleGenresChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                  onBlur={() =>
                    handleFieldBlur('Genres', genres, () =>
                      movieContext.setGenres(genres!)
                    )
                  }
                  error={movieContext.state.validity.Genres !== ''}
                >
                  {allGenres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
                {movieContext.state.validity.Genres !== '' && (
                  <FormHelperText error>
                    {movieContext.state.validity.Genres}
                  </FormHelperText>
                )}
              </FormControl>
              <TextField
                label={'Imdb link'}
                style={{...inputStyles, paddingBottom:14}}
                value={imdbLink}
                onBlur={() =>
                  handleFieldBlur('ImdbLink', imdbLink, () =>
                    movieContext.setImdbLink(imdbLink)
                  )
                }
                required
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
                ) => setImdbLink(event.target.value)}
              />
              <DirectorAsyncAutocomplete
                inputStyle={inputStyles}
                onChange={(value) => {
                  value
                    ? movieContext.setDirector(value)
                    : movieContext.setDirector({ Id: '', Name: '' });
                }}
              />
            </Stack>
        </Stack>
      </MainSection>
    </Stack>
  );
};
