import { myMSALObj }  from './AuthConfig';
import { StudyObj } from "../components/common/interfaces";
import axios from 'axios';
import _ from 'lodash';

  export const acquireTokenSilent = async () => {
    myMSALObj.acquireTokenSilent(loginRequest)
    .then((tokenResponse:any) => {  
        // Callback code here
      }).catch((error:string) => {
        console.log(error);
    });
  }

  const cyToken = localStorage.getItem("cyToken");

  const queryFromArray = params => {
    let query = '';
    params = params || [];
    if (params.length > 0) query = '?';
    let firstSet = true;
    for (var i = 0; i < params.length; i++) {
        if (params[i].value !== null && params[i].value !== undefined) {
            if (i > 0 && !firstSet) query += '&';
            firstSet = false;
            query += params[i].name + '=' + encodeURIComponent(params[i].value);
        }
    }
    return query;
};

const queryFromObject = (o: any) => {
  let query = '';
  let props = Object.getOwnPropertyNames(o);
  if (props.length > 0) query = '?';
  let firstSet = true;
  for (var i = 0; i < props.length; i++) {
      if (o[props[i]] !== null && o[props[i]] !== undefined) {
          if (i > 0 && !firstSet) query += '&';
          firstSet = false;
          query += props[i] + '=' + encodeValue(o[props[i]]);
      }
  }
  return query;
};

const encodeValue = (value: any) => {
  if (
      value &&
      value.length &&
      value.length > 0 &&
      value[0].value !== undefined
  ) {
      return encodeURIComponent(
          _.without(
              value.map(i => i.value),
              null
          ).join(',')
      );
  }
  return encodeURIComponent(value);
};

  export const apiRequest = async (url: string, params?: any, acceptHeader?: string, fileName?: string) => {
    let query = '';
    params = params || [];
    if (Array.isArray(params)) {
        query = queryFromArray(params);
    } else {
        query = queryFromObject(params);
    }
    if (params.length > 0) query = '?';
    let firstSet = true;
    for (var i = 0; i < params.length; i++) {
        if (params[i].value !== null) {
            if (i > 0 && !firstSet) query += '&';
            firstSet = false;
            query += params[i].name + '=' + encodeURIComponent(params[i].value);
        }
    }
    return new Promise(function (resolve, reject) {
        const _apiRequest = (accessToken) => {
            console.log('request made to Graph API at: ' + new Date().toString());
            return fetch(`${process.env.REACT_APP_SEPES_BASE_API_URL}${url}${query}`, {
                method: "get",
                headers: makeHeaders(accessToken, acceptHeader)
            })
                .then((response) => {
                    if (response.status !== 200) {
                        return response.json().then(data => data.error ? data : { error: data })
                    } else {
                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.indexOf('application/json') !== -1) {
                            return response.json()
                        } else if (contentType && acceptHeader && contentType.indexOf(acceptHeader) !== -1) {
                            return response.blob().then(blob => {
                                var newBlob = new Blob([blob], { type: acceptHeader });
                                const data = window.URL.createObjectURL(newBlob);
                                var link = document.createElement('a');
                                link.href = data;
                                link.download = fileName || 'file';
                                link.click();
                                setTimeout(function () {
                                    window.URL.revokeObjectURL(data);
                                }, 100);
                            });
                        }
                    }
                })
                .then((responseData) => {
                    return resolve(responseData);
                })
                .catch(error => {
                    console.log("apiRequest err", error);
                    return { error: error }
                })
        }

        if (cyToken) {
            _apiRequest(cyToken);
        } else {
            myMSALObj.acquireTokenSilent(loginRequest)
                .then((tokenResponse: any) => {
                    _apiRequest(tokenResponse.accessToken);
                }).catch((error: string) => {
                    console.log("acquireToken err", error);
                });
        }
    }).catch((error: string) => {
        console.log("apiRequest err", error);
    });
}
/*
  export const apiCallWithToken = async (url:any) => {
    return new Promise(function (resolve, reject){
      myMSALObj.acquireTokenSilent(loginRequest)
      .then((tokenResponse:any) => {
  
        if(tokenResponse.accessToken){
          //const headers = new Headers();
          const bearer = `Bearer ${tokenResponse.accessToken}`;
          const headers = makeHeaders(tokenResponse.accessToken)
          //headers.append("Authorization", bearer);
    
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
*/

  const makeHeaders = (accessToken: any, acceptHeader?: string) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json")
    headers.append('Accept', acceptHeader ? acceptHeader : 'application/json');
    return headers;
}
/*
  const makeHeaders = (accessToken: any) => {
    const cyToken = localStorage.getItem("cyToken");
    if (cyToken) {
	    accessToken = cyToken;
    }
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json")
    headers.append('Accept', 'application/json');
    return headers;
}*/


/*
  export const apiRequestWithToken2 = async (url:any, method:string, body?:any) => {
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
*/
  export const apiRequestWithToken = async (url: string, method:string, body?: any,) => {
    return new Promise(function (resolve, reject) {
        const _post = async (accessToken) => {
            console.log('post request made to Graph API at: ' + new Date().toString());
            try {

                const headers = makeHeaders(accessToken)
                const options = {
                  method,
                  headers: headers,
                  body: JSON.stringify(body)
          };
          return fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options)
          .then((response) => response.json())
          .then((responseData) => { return resolve(responseData); })
          .catch(error => console.log(error));
            }
            catch (error) {
                return resolve(error);
            }
        }

        if (cyToken) {
            _post(cyToken);
        } else {
            myMSALObj.acquireTokenSilent(loginRequest)
                .then((tokenResponse: any) => {
                    _post(tokenResponse.accessToken);
                }).catch((error: string) => {
                    console.log(error);
                });
        }
    })
}

  export const makeFileBlobFromUrl = async (blobUrl: any, fileName: string) => {
    const axiosWithBlobUrl = axios.create({
        baseURL: blobUrl,
        timeout: 1000,
    });
    const response = await axiosWithBlobUrl.get('', {
        responseType: 'blob',
    });

    return new File([response.data], fileName);
};

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


export const postFile = async (url, files: any) => {
  return new Promise(function (resolve, reject) {
      myMSALObj.acquireTokenSilent(loginRequest)
          .then((tokenResponse: any) => {
              if (tokenResponse.accessToken) {
                  const headers = new Headers();
                  const bearer = `Bearer ${tokenResponse.accessToken}`;
                  headers.append("Authorization", bearer);

                  const options = {
                      method: 'POST',
                      headers: headers,
                      body: files
                  };

                  const config = {
                      headers: {
                          Authorization: `Bearer ${bearer}`
                      },
                  };

                  console.log('request made to Graph API at: ' + new Date().toString());

                  return fetch(`${process.env.REACT_APP_SEPES_BASE_API_URL}${url}`, options)
                      .then((response) => response.blob())
                      .then((responseData) => { return resolve(responseData); })
                      .catch(error => console.log(error))
              }

              // Callback code here
          }).catch((error: string) => {
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
    scopes: [process.env.REACT_APP_SEPES_CLIENTID+ "/User.Read"]
  };
