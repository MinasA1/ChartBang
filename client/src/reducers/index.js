import {combineReducers} from 'redux';
import user, {getUser} from './user';
import data, {loadSchema} from './data';
import {reducer as formReducer} from 'redux-form';

export {getUser, loadSchema};

const rootReducer = combineReducers({
  user,
  data,
  form: formReducer
});

export default rootReducer;
