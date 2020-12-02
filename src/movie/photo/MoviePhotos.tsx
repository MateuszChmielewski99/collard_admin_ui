import { validateCreateMovieRequest } from 'collard_admin_models';
import React from 'react';
import { ImageManager } from '../../common/components/ImageManager';
import { MainSection } from '../../common/components/layout/MainSection';
import { useMovieContext } from '../common/context/MovieState';

const MovieAddPhotos = () => {
  const movieContext = useMovieContext();
 
  const validateModel = () => {
    const result = validateCreateMovieRequest(
      movieContext.state.data
    ) as boolean;

    movieContext.setIsVald(result);
  };

  const handleImageUpload = (files: File[]) => {
    const imagesToSet = [...movieContext.state.images, ...files];
    movieContext.setImages(imagesToSet);
    validateModel();
  };

  const removeFileUrl = (index:number) => {
    const currentUrl = [...(movieContext.state.data.ImagesUrls || [])];
    currentUrl.splice(index, 1);
    movieContext.setImagesUrls(currentUrl);
  }

  const removeNotUploadedImage = (item:string) => {
    const indexOfFile = movieContext.state.images.map(s => URL.createObjectURL(s)).indexOf(item);
    const currentImages = [...movieContext.state.images];
    currentImages.splice(indexOfFile!, 1);
    movieContext.setImages(currentImages);
  }

  const handleDeleteMovie = (item: string) => {
    const indexOfUrl = movieContext.state.data.ImagesUrls?.indexOf(item);
    
    if (indexOfUrl !== undefined && indexOfUrl !== -1) {
      removeFileUrl(indexOfUrl);
    } else {
      removeNotUploadedImage(item);
    }

    validateModel();
  };

  return (
    <MainSection>
      <ImageManager
        images={movieContext.state.images}
        onImageUpload={handleImageUpload}
        onImageDelete={handleDeleteMovie}
        initiImages={movieContext.state.data.ImagesUrls || []}
      />
    </MainSection>
  );
};

export default MovieAddPhotos;
