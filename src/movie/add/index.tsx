import React from 'react';
import { MovieProvider } from '../common/context/MovieState';
import MovieAdd from './MovieAdd';

const MovieAddSection = () => {
  return (
    <MovieProvider>
      <MovieAdd />
    </MovieProvider>
  );
};

export default MovieAddSection;
