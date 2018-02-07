
const devUrl = 'http://localhost:3000/api/v1/'
export const userLogout = () => ({
  type: "USER_LOGOUT"
});

export const authenticateUser = user => ({
  type: "AUTHENTICATE_USER",
  user
});

const authRequest = (userCredentials, url) => {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials)
  }).then(res => {
      if (!res.ok) {
        if (res.status >= 400 && res.status < 500) {
          return res.json().then(data => {
            let err = {authErrorMessage: data.message};
            throw err;
          })
        } else {
        let err = {authErrorMessage: "Please try again later.  Server not responding."};
          throw err;
        }
      }
      return res.json()
    });
}
export const setSchema = schema => ({
  type: 'SET_SCHEMA',
  schema
});

const getSchema = (options, url) => {
  console.log(options, 'FROM GETSCHEMA');
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options)
  }).then(res => {
      if (!res.ok) {
        if (res.status >= 400 && res.status < 500) {
          return res.json().then(data => {
            let err = {SchemaMessage: data.message};
            throw err;
          })
        } else {
        let err = {SchemaMessage: "Please try again later.  Server not responding."};
          throw err;
        }
      }
      return res.json()
    }); 
}
export const signUp = (authInfo) => (
  (dispatch, getState) => (
    authRequest(authInfo, devUrl+'auth/sign_up')
      .then(currentUser => dispatch(authenticateUser(currentUser)))
  )
);

export const signIn = (authInfo) => (
  (dispatch, getState) => (
    authRequest(authInfo, devUrl+'auth/sign_in')
      .then(currentUser => dispatch(authenticateUser(currentUser)))
  )
);
export const submitDb = (dbOptions) => (
  (dispatch, getState) => (
    getSchema(dbOptions, devUrl+'database')
    .then(schema => dispatch(setSchema(schema)))
  )
);