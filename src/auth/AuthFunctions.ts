export function signIn(myMSALObj:any) {
    myMSALObj.loginPopup(loginRequest)
      .then((loginResponse : any) => {
        console.log('id_token acquired at: ' + new Date().toString());
        console.log(loginResponse);
        
        if (myMSALObj.getAccount()) {
          console.log("It worked!!");
          console.log(myMSALObj.getAccount());
          //showWelcomeMessage(myMSALObj.getAccount());
        }
      }).catch((error:string) => {
        console.log(error);
      });
  }

  export function acquireTokenSilent(myMSALObj:any){
    myMSALObj.acquireTokenSilent(tokenRequest)
    .then((tokenResponse:any) => {
        // Callback code here
    }).catch((error:string) => {
        console.log(error);
    });
  }

  export function signOut(myMSALObj: any) {
    myMSALObj.logout();
  }

  export const loginRequest = {
    scopes: ["openid", "profile", "User.Read"]
  };
  
  // Add here scopes for access token to be used at MS Graph API endpoints.
  export const tokenRequest = {
    scopes: ["User.Read"]
  };