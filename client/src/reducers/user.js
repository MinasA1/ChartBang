import Cookies from 'universal-cookie';
const cookies = new Cookies();

const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const clearUser = () => {
  cookies.remove('access_token', {path: '/'});
  cookies.remove('user', {path: '/'});
  localStorage.removeItem('schema');
  localStorage.removeItem('user');
};

export const getUser = () => {
  try {
    //let user = cookies.get('user');
    return JSON.parse(localStorage.getItem('user'))
  } catch(e) {
    return undefined;
  }
};


const user = (state=null, action) => {
  switch(action.type) {
    case "USER_LOGOUT":
      clearUser();
      return null;
    case "AUTHENTICATE_USER":
      console.log(action.user, 'Iam THE ACTION');
      setUser(action.user);
      return {...action.user};
    default:
      return state;
  }
};

export default user;
