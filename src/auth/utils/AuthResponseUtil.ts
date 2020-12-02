import {
    GoogleLoginResponse
  } from 'react-google-login';

export const isGoogleLoginResponse = (obj:any): obj is GoogleLoginResponse => {
    return (obj as GoogleLoginResponse).tokenId !== undefined;
}