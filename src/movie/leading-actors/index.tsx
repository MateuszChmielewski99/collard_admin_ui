import {
  CreateMovieRequest,
  EntityReference,
  validateCreateMovieRequest,
} from 'collard_admin_models';
import React from 'react';
import { MainSection } from '../../common/components/layout/MainSection';
import { Stack } from '../../common/components/Stack';
import { createErrorMessage } from '../../common/helpers/errorMessage.factory';
import LeadingActors from '../common/components/LeadingActors';
import { LeadingActorsData } from '../common/context/MovieEvents';
import { useMovieContext } from '../common/context/MovieState';

export const LeadingActorsComponent = () => {
  const movieContext = useMovieContext();

  const handleFieldBlur = (fieldName: keyof CreateMovieRequest) => {
    const validationResult = validateCreateMovieRequest(
      movieContext.state.data
    );
    const nameErrors = validateCreateMovieRequest.errors
      ?.map((s) => createErrorMessage(s))
      .filter((s) => s?.property === fieldName);

    movieContext.setIsVald(validationResult as boolean);

    if (!nameErrors?.length) {
      movieContext.setFieldErrorMessage(fieldName, '');
      return;
    }

    movieContext.setFieldErrorMessage(fieldName, nameErrors.join('\n') || '');
  };

  const handleDeleteActor = (id: string) => {
    const currentActors = [...movieContext.state.data.LeadingActors];
    const updated = currentActors.filter((s) => s.Id !== id);
    movieContext.setLeadingActors((updated as any) as LeadingActorsData);
  };

  const handleAddActor = (newActor: EntityReference | null) => {
    if (!newActor) return;
    const currentActors = [...movieContext.state.data.LeadingActors];
    currentActors.push(newActor);
    movieContext.setLeadingActors((currentActors as any) as LeadingActorsData);
    handleFieldBlur('LeadingActors');
  };

  return (
    <Stack style={{ paddingLeft: '30px', height: '100%', width:'100%' }}>
      <MainSection>
        <span
          style={{
            font: 'bold',
            fontSize: '2rem',
          }}
        >
          Leading Actors
        </span>
        <Stack style={{height:'calc(100% - 4rem - 30px)', boxSizing:'border-box' }}>
          <LeadingActors
            data={movieContext.state.data.LeadingActors}
            onAdd={handleAddActor}
            onDelete={handleDeleteActor}
            errorMessage={movieContext.state.validity.LeadingActors}
            onChange={() => {}}
          />
        </Stack>
      </MainSection>
    </Stack>
  );
};
