import {
  CreateMovieRequest,
  EntityReference,
  MovieContract,
} from 'collard_admin_models';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { movieReducer } from './MovieReducre';
import { LeadingActorsData, GenresData } from './MovieEvents';
import MovieErrors from '../types/MovieErrors';

export type MovieState = {
  data: CreateMovieRequest;
  isValid: boolean;
  validity: MovieErrors;
  images:File[];
};

const emptyEntityRef: EntityReference = {
  Id: '',
  Name: '',
};

const init: MovieState = {
  data: {
    Director: emptyEntityRef,
    Genres: [],
    ImdbLink: '',
    ImdbScore: 0,
    LeadingActors: [],
    Name: '',
    Year: 0,
    ImagesUrls: [],
    OriginalCountry: undefined,
    OriginalLanguage: undefined,
  },
  validity: {
    Director: '',
    Genres: '',
    ImagesUrls: '',
    ImdbLink: '',
    ImdbScore: '',
    LeadingActors: '',
    Name: '',
    OriginalCountry: '',
    OriginalLanguage: '',
    Year: '',
  },
  isValid: false,
  images:[]
};

const MovieContext = createContext<{
  setImagesUrls: (urls: string[]) => void;
  setOriginalLanguages: (languages: EntityReference) => void;
  setOriginalCountr: (countries: EntityReference) => void;
  setYear: (year: number) => void;
  setLeadingActors: (actors: LeadingActorsData) => void;
  setImdbScore: (score: number) => void;
  setImdbLink: (url: string) => void;
  setGenres: (genres: GenresData) => void;
  setName: (name: string) => void;
  setDirector: (director: EntityReference) => void;
  setIsVald: (isValid: boolean) => void;
  setData: (data: MovieContract) => void;
  setImages:(data:File[]) => void;
  setFieldErrorMessage: (
    fieldName: keyof CreateMovieRequest,
    errorMessage: string
  ) => void;
  state: MovieState;
} | null>(null);

export const useMovieContext = () => {
  const ctx = useContext(MovieContext);

  if (ctx === null || ctx === undefined) {
    throw new Error('Movie context must be used within movie provider!');
  }

  return ctx;
};

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [state, send] = useReducer(movieReducer, init);

  const setData = (data: MovieContract) => {
    send({
      type: 'SET_DATA',
      data,
    });
  };

  const setFieldErrorMessage = (
    fieldName: keyof CreateMovieRequest,
    errorMessage: string
  ) => {
    send({
      type: 'SET_FIELD_ERROR_MESSAGE',
      errorMessage: errorMessage,
      fieldName: fieldName,
    });
  };

  const setImagesUrls = (urls: string[]) => {
    send({
      type: 'SET_IMAGES_URLS',
      data: urls,
    });
  };

  const setOriginalLanguages = (data: EntityReference) => {
    send({
      type: 'SET_ORIGINAL_LANGUAGE',
      data,
    });
  };

  const setOriginalCountr = (data: EntityReference) => {
    send({
      type: 'SET_ORIGINAL_COUNTRY',
      data,
    });
  };

  const setYear = (data: number) => {
    send({
      type: 'SET_YEAR',
      data,
    });
  };

  const setLeadingActors = (data: LeadingActorsData) => {
    send({
      type: 'SET_LEADING_ACTORS',
      data,
    });
  };

  const setImdbScore = (data: number) => {
    send({
      type: 'SET_IMDB_SCORE',
      data,
    });
  };

  const setImdbLink = (data: string) => {
    send({
      type: 'SET_IMDB_LINK',
      data,
    });
  };

  const setGenres = (data: GenresData) => {
    send({
      type: 'SET_GENRES',
      data,
    });
  };

  const setName = (data: string) => {
    send({
      type: 'SET_NAME',
      data,
    });
  };

  const setDirector = (data: EntityReference) => {
    send({
      type: 'SET_DIRECTOR',
      data,
    });
  };

  const setIsVald = (isValid: boolean) => {
    send({
      type: 'SET_IS_VALID',
      isValid,
    });
  };

  const setImages = (images:File[]) => {
    send({
      type:'SET_IMAGES',
      images
    })
  }

  return (
    <MovieContext.Provider
      value={{
        setData,
        setFieldErrorMessage,
        setDirector,
        setGenres,
        setImagesUrls,
        setImdbLink,
        setImdbScore,
        setIsVald,
        setLeadingActors,
        setName,
        setOriginalCountr,
        setOriginalLanguages,
        setYear,
        setImages,
        state,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
