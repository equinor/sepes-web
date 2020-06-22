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
    return new Promise(function (resolve, reject){
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
      
      return fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options)
        .then((response) => response.json())
        .then((responseData) => { return resolve(responseData); })
        .catch(error => console.log(error))
        } 
        
          // Callback code here
      }).catch((error:string) => {
          console.log(error);
      });
    })
    
  }

  export const apiRequestWithToken = async (url:any, body:any, method:string) => {
    return new Promise(function (resolve, reject){
      myMSALObj.acquireTokenSilent(loginRequest)
      .then((tokenResponse:any) => {
  
        if(tokenResponse.accessToken){
          const headers = new Headers();
          const bearer = `Bearer ${tokenResponse.accessToken}`;
    
          headers.append("Authorization", bearer);
          headers.append("Accept", "application/json");
          headers.append("Content-Type", "application/json");
          const options = {
              method,
              headers: headers,
              body: JSON.stringify(body)
      };
    
      console.log('request made to Graph API at: ' + new Date().toString());
      
      return fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options)
        .then((response) => response.json())
        .then((responseData) => { return resolve(responseData); })
        .catch(error => console.log(error))
        } 
        
          // Callback code here
      }).catch((error:string) => {
          console.log(error);
      });
    })
    
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
    scopes: [process.env.REACT_APP_SEPES_CLIENTID + ""]
  };
