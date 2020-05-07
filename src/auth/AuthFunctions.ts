import { myMSALObj }  from './AuthConfig';

  export const acquireTokenSilent = async () => {
    myMSALObj.acquireTokenSilent(loginRequest)
    .then((tokenResponse:any) => {  
        // Callback code here
    }).catch((error:string) => {
        console.log(error);
    });
  }

  export const apiCallWithToken = async (url:any) => {
    myMSALObj.acquireTokenSilent(loginRequest)
    .then((tokenResponse:any) => {

      if(tokenResponse.accessToken){
        const headers = new Headers();
        const bearer = `Bearer ${tokenResponse.accessToken}`;
  
        headers.append("Authorization", bearer);
  
        const options = {
            method: "GET",
            headers: headers
    };
  
    console.log('request made to Graph API at: ' + new Date().toString());
    
    fetch(url, options)
      .then(response => response.json())
      .then(response => console.log('res', response))
      .catch(error => console.log(error))
      } 
      
        // Callback code here
    }).catch((error:string) => {
        console.log(error);
    });
  }

  function authCallback(error:any, response:any) {
    //handle redirect response
    if(response){
      console.log('id_token acquired at: ' + new Date().toString());
    }
    else{
      console.log('err', error)
    }
  };

export function signInRedirect(){
  myMSALObj.handleRedirectCallback(authCallback);
  myMSALObj.loginRedirect(loginRequest);
}

  export function signOut(myMSALObj: any) {
    myMSALObj.logout();
  }

  export const loginRequest = {
    scopes: ["e90cbb61-896e-4ec7-aa37-23511700e1ed"]
  };
