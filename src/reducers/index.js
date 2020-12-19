import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import successMessageReducer from './successReducer';
import postReducer from './postReducer';
import draftingReducer from './draftingReducer';
import teamReducer from './teamReducer';

const rootReducer = combineReducers({
	teamReducer: teamReducer,
	draftingReducer: draftingReducer,
	userReducer: userReducer,
	postReducer: postReducer,
	errorReducer: errorReducer,
	successMessageReducer: successMessageReducer,
});

export default rootReducer;
