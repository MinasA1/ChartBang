import {combineReducers} from 'redux';
import user, {getUser} from './user';
import data, {loadSchema} from './data';
import page from './page'
import sidebar from './sidebar'
import charts from './charts'
import {reducer as formReducer} from 'redux-form';

export {getUser, loadSchema};

const rootReducer = combineReducers({
  charts,
  user,
  sidebar,
  data,
  page,
  form: formReducer
});

export default rootReducer;
