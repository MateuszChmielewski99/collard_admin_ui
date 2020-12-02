import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
  useGoogleLogout,
} from 'react-google-login';
import { isGoogleLoginResponse } from '../utils/AuthResponseUtil';

export const AuthContext = createContext<{
  isSignedIn: boolean;
  tokenId: string;
  signIn: () => void;
  signOut: () => void;
} | null>(null);

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if(!ctx) throw new Error('Invalid usage')

  return ctx;
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setIsSignIn] = useState(false);
  const [tokenId, setTokenId] = useState('');

  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (!isGoogleLoginResponse(response)) return;

    setTokenId(response.tokenId);
    setIsSignIn(true);
  };

  const clientId = process.env.ENV !== 'dev' ?
  '148743879435-7mucbmlta054dvt263valoi7g0qig5hp.apps.googleusercontent.com':
  '148743879435-od2n5gsuog38mv71b8r1j62vi1thgvjh.apps.googleusercontent.com';

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure: (e) => {console.log(e)},
    clientId,
    isSignedIn: true,
  });

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess: () => setIsSignIn(false),
  });

  return (
    <AuthContext.Provider value={{ isSignedIn, tokenId, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
