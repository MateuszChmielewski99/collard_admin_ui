import React from 'react';
import { AppLayout } from './common/page/layout/AppLayout';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { Routes } from './common/routing/Routes';
import { useAuthContext } from './auth/context/AuthContext';
import { Unauthorized } from './auth/unauthorized';

function App() {
  const history = createBrowserHistory();
  const authContext = useAuthContext();
  
  if(!authContext.isSignedIn){
    return <Unauthorized />
  }


  return (
    <div className="App">
      <Router history={history}>
        <AppLayout>
          <Routes />
        </AppLayout>
      </Router>
    </div>
  );
}

export default App;
