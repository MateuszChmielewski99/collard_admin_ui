import { RouteItem } from '../../../common/routing/RouteItem';
import { MovieListing } from '../../listing/MovieListing';
import { RouteSection } from '../../../common/routing/RouteSection';
import MovieAddSection from '../../add';
import MovieEditSection from '../../edit';

export enum MovieRoutPaths {
  Add = '/movie/add',
  All = '/movie',
  Edit = '/movie/:movieId',
}

export const MovieRoutes: RouteItem[] = [
  {
    key: 'movie-view-all-section',
    path: MovieRoutPaths.All,
    component: MovieListing,
    name: 'View all',
    exact: true,
  },
  {
    key: 'movie-add-section',
    component: MovieAddSection,
    path: MovieRoutPaths.Add,
    name: 'Add new',
    exact: true,
  },
  {
    key: 'movie-edit-section',
    component: MovieEditSection,
    path: MovieRoutPaths.Edit,
    name: 'Edit',
    exact: true,
  },
];

export const movieSection: RouteSection = {
  items: [
    {
      key: 'movie-view-all-section',
      path: MovieRoutPaths.All,
      component: MovieListing,
      name: 'View all',
      exact: true,
    },
    {
      key: 'movie-add-section',
      component: MovieAddSection,
      path: MovieRoutPaths.Add,
      name: 'Add new',
      exact: true,
    },
  ],
  sectionName: 'Movie',
};
