import TabPanel from '../../common/components/TabPanel';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BreadcrumbsContainer from '../../common/components/Breadcrumbs/Breadcrumbs';
import { Button, ButtonTypes } from '../../common/components/Button';
import { HeaderSection } from '../../common/components/HeaderSection/HeaderSection';
import { Stack } from '../../common/components/Stack';
import { useToastContext } from '../../common/toast/context/ToastState';
import { useMovieContext } from '../common/context/MovieState';
import { MovieRoutPaths } from '../common/routes/movie-routes';
import MovieInfo from '../info/MovieAddInfo';
import { MovieApiService } from '../MovieApiService';
import MovieAddPhotos from '../photo/MoviePhotos';
import { MovieEditTabs } from '../common/tabs/MovieTabs';
import { CircularProgress } from '@material-ui/core';
import { createUpdateMovieRequest } from '../helpers/CreateUpdateMovieRequest';

const MovieEdit = (props: { movieId: string }) => {
  const movieApiService = new MovieApiService();
  const movieContext = useMovieContext();
  const toastContext = useToastContext();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    movieApiService
      .getById(props.movieId)
      .then((resp) => movieContext.setData(resp.data))
      .catch(() => toastContext.show('error', 'Error while fetching movie'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleEditMovie = () => {
    if (movieContext.state.images.length) uploadPosters(saveMovie);
    else saveMovie();
  };

  const saveMovie = (urls?: string[]) => {
    const request = createUpdateMovieRequest(
      movieContext.state.data,
      props.movieId
    );

    if (urls) urls.forEach(e => request.ImagesUrls?.push(e));

    movieApiService
      .update(request)
      .then(() => {
        history.push(MovieRoutPaths.All);
      })
      .catch((error) => {
        const message = error.Errors?.join('\n') ?? 'Error while updating data';
        toastContext.show('error', message);
      });
  };

  const uploadPosters = (callback: (urls: string[]) => void) => {
    movieApiService
      .uploadPosters(movieContext.state.images)
      .then((res) => {
        toastContext.show('success', 'uploaded');
        callback(res.data)
      })
      .catch((err) => {
        toastContext.show(
          'error',
          'Error while uploading files'
        );
      });
  };

  const handleDelete = () => {
    movieApiService
      .delete(props.movieId)
      .then(() => {
        toastContext.show('success', 'Successfully deleted movie');
        history.push(MovieRoutPaths.All);
      })
      .catch(() => {
        toastContext.show('error', 'Error while deleting movie');
      });
  };

  const isFormValid = movieContext.state.isValid;

  const ctaItems = [
    <Button
      onClick={handleDelete}
      data-automation-id={'delete-button'}
      variant={ButtonTypes.Warning}
    >
      Delete
    </Button>,
    <Button
      data-automation-id={'save-button'}
      onClick={handleEditMovie}
      disabled={!isFormValid}
    >
      Save
    </Button>,
  ];
  const [currentTab, setCurrentTab] = useState(0);

  const getCurrentTabSection = () => {
    switch (currentTab) {
      case 0:
        return <MovieInfo isNameDisabled />;
      case 1:
        return <MovieAddPhotos />;
    }
  };

  return (
    <Stack className={'MovieMainSection'}>
      <HeaderSection title={'Edit movie'} ctaItems={ctaItems} />
      <BreadcrumbsContainer />
      {!isLoading ? (
        <Stack>
          <TabPanel
            value={currentTab}
            items={MovieEditTabs}
            onChange={(e, v) => setCurrentTab(v)}
          />
          {getCurrentTabSection()}
        </Stack>
      ) : (
        <Stack alignSelf={'center'}>
          <CircularProgress />
        </Stack>
      )}
    </Stack>
  );
};

export default MovieEdit;
