import * as Ajv from 'ajv';

export type ValidationError = {
  property: string;
  errorMessage: string;
};

export const createErrorMessage = (
  error: Ajv.ErrorObject | null | undefined
): ValidationError | undefined => {
  if (!error) return undefined;
  switch (error.keyword) {
    case 'required':
      return {
        property: getPropertyName(error.dataPath),
        errorMessage: 'Field required',
      };
    case 'minLength':
      return {
        property: getPropertyName(error.dataPath),
        errorMessage: `Should not be shorter than ${
          (error.params as any).limit
        }`,
      };
    case 'pattern':
      return {
        property: getPropertyName(error.dataPath),
        errorMessage: `Invalid ${error.dataPath.split('/').pop()}`,
      };
    case 'maxItems':
      return {
        property: getPropertyName(error.dataPath),
        errorMessage: error.message || '',
      };
    default:
      return undefined;
  }
};

const getPropertyName = (dataPath: string) => {
  const splited = dataPath.split('/');
  return splited.filter((s) => s !== '')[0];
};
