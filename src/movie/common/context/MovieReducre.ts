import { MovieContract } from 'collard_admin_models';
import produce from 'immer';

import { MovieEvents } from './MovieEvents';
import { MovieState } from './MovieState';

export const movieReducer = (draft: MovieState, event: MovieEvents) => {
  return movieProducer(draft, event);
};

const getMovieData = (eventData: MovieContract) => {
  const { id, ...rest } = eventData;
  return rest;
};

const movieProducer = produce((draft: MovieState, event: MovieEvents) => {
  switch (event.type) {
    case 'SET_DIRECTOR':
      draft.data.Director = event.data;
      break;
    case 'SET_GENRES':
      (draft.data.Genres as any) = event.data;
      break;
    case 'SET_IMAGES_URLS':
      draft.data.ImagesUrls = event.data;
      break;
    case 'SET_IMDB_LINK':
      draft.data.ImdbLink = event.data;
      break;
    case 'SET_IMDB_SCORE':
      draft.data.ImdbScore = event.data;
      break;
    case 'SET_IS_VALID':
      draft.isValid = event.isValid;
      break;
    case 'SET_LEADING_ACTORS':
      (draft.data.LeadingActors as any) = event.data;
      break;
    case 'SET_NAME':
      draft.data.Name = event.data;
      break;
    case 'SET_ORIGINAL_COUNTRY':
      draft.data.OriginalCountry = event.data;
      break;
    case 'SET_ORIGINAL_LANGUAGE':
      draft.data.OriginalLanguage = event.data;
      break;
    case 'SET_YEAR':
      draft.data.Year = event.data;
      break;
    case 'SET_FIELD_ERROR_MESSAGE':
      draft.validity[event.fieldName] = event.errorMessage;
      break;
    case 'SET_DATA':
      draft.data = getMovieData(event.data);
      break;
    case 'SET_IMAGES':
      draft.images = event.images;
      break;
    default:
      throw new Error('Invalid event type');
  }
});
