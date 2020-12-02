import { IconButton } from '@material-ui/core';
import { EntityReference } from 'collard_admin_models';
import React, { useRef, useState } from 'react';
import { Stack } from '../../../../common/components/Stack';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AsyncAutocomplete from '../../../../common/components/AsyncAutocomplete';
import { MovieApiService } from '../../../MovieApiService';
import { useMovieContext } from '../../context/MovieState';
import { LeadingActorsProps } from './LeadingActorsProps';

const LeadingActors = (props: LeadingActorsProps) => {
  const [actor, setActor] = useState<EntityReference | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allActors, setAllActors] = useState<EntityReference[]>([]);
  const [inputValue, setInputValue] = useState('');
  const movieApiService = new MovieApiService();
  const movieContext = useMovieContext();

  const search = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setIsLoading(true);
    movieApiService
      .searchActors(event.target.value)
      .then((s) => setAllActors(s.data))
      .finally(() => setIsLoading(false));
  };

  return (
    <Stack style={{ height: '100%', boxSizing:'border-box' }}>
      <Stack
        alignItems={!props.data?.length ? 'center' : 'flex-start'}
        justifyContent={!props.data?.length ? 'center' : 'flex-start'}
      >
        {props.data.length ? (
          props.data.map((item) => (
            <Stack
              horizontal
              key={item.Id}
              style={{ width: '90%', padding: 16 }}
            >
              <span style={{ marginTop: 3 }}>{item.Name}</span>
              <Stack flex={1}></Stack>
              <Stack style={{ width: 15 }}>
                <IconButton
                  onClick={() => props.onDelete(item.Id)}
                  style={{ height: 12, width: 12, color: '#8b0000' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
          ))
        ) : (
          <span> No data aviable</span>
        )}
      </Stack>
      <Stack flex={'1'}></Stack>
      <Stack
        alignItems={'flex-start'}
        justifyContent={'center'}
        horizontal
      >
        <AsyncAutocomplete<EntityReference>
          getSelectedOption={(f, s) => f.Name === s.Name}
          renderItem={(s) => s.Name}
          label={'Leading Actor'}
          onChange={(_e, v) => setActor(v)}
          isLoading={isLoading}
          options={allActors}
          disabled={
            movieContext.state.data.LeadingActors.length >= props.maxItems!
          }
          onInputChange={search}
          inputProps={{
            value: inputValue,
            onChange: (e: any) => {
              setInputValue(e.target.value);
            },
            error: props.errorMessage !== '',
            helperText: props.errorMessage,
          }}
        />
        <IconButton
          onClick={() => {
            props.onAdd(actor);
            setActor(null);
            setInputValue('');
          }}
          disabled={
            movieContext.state.data.LeadingActors.length >= props.maxItems!
          }
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

LeadingActors.defaultProps = {
  maxItems: 3,
};

export default LeadingActors;
