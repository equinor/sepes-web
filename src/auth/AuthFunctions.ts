import { myMSALObj }  from './AuthConfig';
import { StudyObj } from "../components/common/interfaces";
import axios from 'axios';

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

  export const apiRequestWithToken = async (url:any, method:string, body?:any) => {
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

  const makeBlobFromUrl = async (blobUrl: string) => {
    const axiosWithBlobUrl = axios.create({
      baseURL: blobUrl,
      timeout: 1000,
    });
    const response = await axiosWithBlobUrl.get('', {
      responseType: 'blob',
    });
    const imageFile = new File([response.data], 'image.' + response.headers['content-type'].split('/')[1]);
    const formData = new FormData();
    formData.append('image', imageFile);
    return formData;
  };
  // Posts the image separately before the piece is posted to the API, returns URL of the uploaded file
export const postBlob = async (imageUrl: string, studyId: string) => {
  const imageFile = await makeBlobFromUrl(imageUrl);
  return new Promise(function (resolve, reject){
    myMSALObj.acquireTokenSilent(loginRequest)
    .then((tokenResponse:any) => {

      if(tokenResponse.accessToken){
        const headers = new Headers();
        const bearer = `Bearer ${tokenResponse.accessToken}`;
  
        headers.append("Authorization", bearer);
        const options = {
            method: 'PUT',
            headers: headers,
            body: imageFile
    };
    const config = {
      headers: {
        Authorization: 'Bearer ' + bearer
      },
    };
    
    console.log('request made to Graph API at: ' + new Date().toString());
    //axios.put(process.env.REACT_APP_SEPES_BASE_API_URL + 'api/studies/1/'+ "logo", imageFile, config);
    
    return fetch(process.env.REACT_APP_SEPES_BASE_API_URL + 'api/studies/' + studyId + '/logo', options)
      .then((response) => response.json())
      .then((responseData) => { return resolve(responseData); })
      .catch(error => console.log(error))
      } 
      
        // Callback code here
    }).catch((error:string) => {
        console.log(error);
    });
  })
};

export const postputStudy = async (study: StudyObj, url:any, method:string, imageUrl:string) => {
  let newStudyWithBlob: StudyObj = {
    ...study
  };
  if(imageUrl){
    const fileUrl =
      "process.env.REACT_APP_BLOB_BASE_URL" +
      (await postBlob(imageUrl, study.id));
  
    newStudyWithBlob = {
      ...study,
      logoUrl: fileUrl,
    };
    console.log('Fileurl:');
    console.log(fileUrl);
  }

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
              body: JSON.stringify(newStudyWithBlob)
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
  };


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
