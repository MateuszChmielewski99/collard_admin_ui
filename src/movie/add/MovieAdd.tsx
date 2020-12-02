import React, { useState } from 'react';
import BreadcrumbsContainer from '../../common/components/Breadcrumbs/Breadcrumbs';
import { Button } from '../../common/components/Button';
import { HeaderSection } from '../../common/components/HeaderSection/HeaderSection';
import { Stack } from '../../common/components/Stack';
import TabPanel from '../../common/components/TabPanel';
import { useMovieContext } from '../common/context/MovieState';
import { MovieApiService } from '../MovieApiService';
import MovieAddTabs from '../common/tabs/MovieTabs';
import MovieInfo from '../info/MovieAddInfo';
import MovieAddPhotos from '../photo/MoviePhotos';
import './movie-add.css';
import { MovieRoutPaths } from '../common/routes/movie-routes';
import { useToastContext } from '../../common/toast/context/ToastState';
import { useHistory } from 'react-router-dom';

const MovieAdd = () => {
  const movieApiService = new MovieApiService();
  const movieContext = useMovieContext();
  const toastContext = useToastContext();
  const history = useHistory();

  const handleSaveMovie = () => {
    if (movieContext.state.images.length) uploadPosters(saveMovie);
    else saveMovie();
  };

  const saveMovie = (urls?: string[]) => {
    const request = movieContext.state.data;

    if(urls) urls.forEach(u => request.ImagesUrls?.push(u));
    
    movieApiService
      .save(request)
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

  const isFormValid = movieContext.state.isValid;

  const ctaItems = (
    <Button
      data-automation-id={'save-button'}
      onClick={handleSaveMovie}
      disabled={!isFormValid}
    >
      Save
    </Button>
  );
  const [currentTab, setCurrentTab] = useState(0);

  const getCurrentTabSection = () => {
    switch (currentTab) {
      case 0:
        return <MovieInfo />;
      case 1:
        return <MovieAddPhotos />;
    }
  };

  return (
    <Stack className={'MovieMainSection'}>
      <HeaderSection title={'Add new movie'} ctaItems={ctaItems} />
      <BreadcrumbsContainer />
      <Stack>
        <TabPanel
          value={currentTab}
          items={MovieAddTabs}
          onChange={(e, v) => setCurrentTab(v)}
        />
        {getCurrentTabSection()}
      </Stack>
    </Stack>
  );
};

export default MovieAdd;
