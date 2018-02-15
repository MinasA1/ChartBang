const api = 'http://localhost:3000/api/v1/'

//ACTION CREATORS

export const userLogout = () => ({
  type: "USER_LOGOUT"
});

export const authenticateUser = user => ({
  type: "AUTHENTICATE_USER",
  user
});

export const setSchema = schema => ({
  type: 'SET_SCHEMA',
  schema
});
export const setPage = (page) => ({
  type: 'SET_STEP',
  page
})
export const nextPage = () => ({
  type: 'NEXT_STEP',
})

export const prevPage = () => ({
  type: 'PREV_STEP',
})

export const toggleSidebar = () => ({
  type: 'TOGGLE'
})

export const loadCharts = (charts) => ({
  type: 'LOAD_CHARTS',
  charts
})

export const addChart = (chart) => ({
  type: 'ADD_CHART',
  chart
})

// REUQESTS
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
          let err = { authErrorMessage: data.message };
          throw err;
        })
      } else {
        let err = { authErrorMessage: "Please try again later.  Server not responding." };
        throw err;
      }
    }
    return res.json()
  });
}

const postRequest = (options, url) => {
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
          let err = { ErrorMessage: data.message };
          throw err;
        })
      } else {
        let err = { ErrorMessage: "Please try again later.  Server not responding." };
        throw err;
      }
    }
    return res.json()
  });
}

const schemaRequest = (options, url) => {
  url = url + ''
  return fetch(url, {
    method: 'GET',
    credentials: 'include',
  }).then(res => {
    if (!res.ok) {
      if (res.status >= 400 && res.status < 500) {
        return res.json().then(data => {
          let err = { ErrorMessage: data.message };
          throw err;
        })
      } else {
        let err = { ErrorMessage: "Please try again later.  Server not responding." };
        throw err;
      }
    }
    return res.json()
  })
}

const getRequest = (url) => (
  dispatch => (
    fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then(res => res.json())
  )
)
// DISPATCHERS

export const signUp = (authInfo) => (
  (dispatch, getState) => (
    authRequest(authInfo, api + 'auth/sign_up')
      .then(currentUser => dispatch(authenticateUser(currentUser)))
  )
);

export const signIn = (authInfo) => (
  (dispatch, getState) => (
    authRequest(authInfo, api + 'auth/sign_in')
      .then(currentUser => dispatch(authenticateUser(currentUser)))
  )
);

export const submitDb = (dbOptions) => (
  (dispatch, getState) => (
    postRequest(dbOptions, api + 'database/')
      .then(schema => dispatch(setSchema(schema)))
  )
);

export const readSchema = (options) => (
  (dispatch, getState) => (
    postRequest(options, api + 'database/get')
      .then(schema => dispatch(setSchema(schema)))
  )
)

export const createChart = (options) => (
  (dispatch, getState) => (
    postRequest(options, api + 'charts/create')
      .then(chart => dispatch(addChart(chart)))
  )
)

export const fetchCharts = (options) => (
  (dispatch, getState) => (
    getRequest(options, api + 'charts/')
      .then(charts => dispatch(loadCharts(charts)))
  )
)
//helpers

const chartDataGen = (table) => {
  let labels = [];
  let data = [];

  for (let i in data) {
    labels.push("Player " + data[i].playerid);
    data.push(data[i].score);
  }

  let chartdata = {
    labels: labels,
    datasets: [
      {
        label: 'Player Score',
        backgroundColor: 'rgba(200, 200, 200, 0.75)',
        borderColor: 'rgba(200, 200, 200, 0.75)',
        hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
        hoverBorderColor: 'rgba(200, 200, 200, 1)',
        data: data
      }
    ]
  };
}
