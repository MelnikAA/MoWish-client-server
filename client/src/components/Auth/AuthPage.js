import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { gapi } from 'gapi-script';

function AuthPage() {  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '111548308893-qhau61vttobiofc1uua6vnklsrdaabo6.apps.googleusercontent.com',
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);


  // **you can access the token like this**
  // const accessToken = gapi.auth.getToken().access_token;
  // console.log(accessToken);

  const onSuccess = response => {
    console.log('SUCCESS', response);
  };
  const onFailure = response => {
    console.log('FAILED', response);
  };
  const onLogoutSuccess = () => {
    console.log('SUCESS LOG OUT');
  };

  return (
    <div>
     
    </div>
  );
}

export default AuthPage;