import React from 'react';
import { useParams } from 'react-router-dom';
import { MovieProvider } from '../common/context/MovieState';
import MovieEdit from './MovieEdit';

const MovieEditSection = () => {
  const params = useParams() as any;
  return (
    <MovieProvider>
      <MovieEdit movieId={params.movieId} />
    </MovieProvider>
  );
};

export default MovieEditSection;
