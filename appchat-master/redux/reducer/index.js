import { combineReducers } from 'redux';

import Auth from './Auth';
// import Navigation from './Navigation';

import user from './user';

export default combineReducers({
    authentication: Auth,
    userState: user
});