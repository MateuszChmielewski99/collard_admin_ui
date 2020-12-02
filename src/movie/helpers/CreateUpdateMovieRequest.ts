import { CreateMovieRequest, UpdateMovieRequest } from 'collard_admin_models';

export const createUpdateMovieRequest = (
  data: CreateMovieRequest,
  id: string
): UpdateMovieRequest => {
  const { Name, ...rest } = data;

  return {
    id,
    ...rest,
  };
};
