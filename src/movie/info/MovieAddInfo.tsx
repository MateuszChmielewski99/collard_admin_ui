import React from 'react';
import { Stack } from '../../common/components/Stack';
import MovieAditionalInfo from '../additional-info';
import { LeadingActorsComponent } from '../leading-actors';
import { MovieMainInfo } from '../main-info';
import { MovieMainInfoProps } from '../main-info/MovieInfoProps';

const MovieInfo = (props: MovieMainInfoProps) => {
  return (
    <Stack
      style={{
        height: '90%',
        marginBottom: 20,
        width: '100%',
        flexWrap: 'wrap',
      }}
    >
      <Stack horizontal alignItems={'flex-start'}>
        <MovieMainInfo isNameDisabled={props.isNameDisabled} />
        <LeadingActorsComponent />
      </Stack>
      <Stack style={{ marginTop: 30 }}>
        <MovieAditionalInfo />
      </Stack>
    </Stack>
  );
};

export default MovieInfo;
