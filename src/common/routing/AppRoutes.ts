import {
  MovieRoutes,
  movieSection,
} from '../../movie/common/routes/movie-routes';
import { RouteSection } from './RouteSection';
import { RouteItem } from './RouteItem';

export const appRoutes: RouteItem[] = [...MovieRoutes];

export const menuRouteSections: RouteSection[] = [movieSection];
