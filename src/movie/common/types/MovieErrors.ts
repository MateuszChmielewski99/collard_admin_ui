import { CreateMovieRequest } from 'collard_admin_models';

type MovieErrors = Record<keyof CreateMovieRequest, string>;

export default MovieErrors;
