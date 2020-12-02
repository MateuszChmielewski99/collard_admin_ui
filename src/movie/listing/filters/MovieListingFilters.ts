export enum SortOrder {
  DESC = 'desc',
  ASC = 'asc',
}

export type MovieListingFilters = {
  sortName: string;
  sortOrder: SortOrder;
  pageSize: number;
  pageNumber: number;
};

export const getDefaultMovieListingFilters = (): MovieListingFilters => {
  return {
    pageSize: 2,
    sortName: 'Name',
    sortOrder: SortOrder.DESC,
    pageNumber: 1,
  };
};
