import {combineReducers} from 'redux';
import user, {getUser} from './user';
import data, {loadSchema} from './data';
import page from './page'
import {reducer as formReducer} from 'redux-form';

export {getUser, loadSchema};

const rootReducer = combineReducers({
  user,
  data,
  page,
  form: formReducer
});

export default rootReducer;
