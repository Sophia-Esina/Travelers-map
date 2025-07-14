import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import {
	userReducer,
	travelReducer,
	travelsReducer,
	appReducer,
	mapReducer,
	dreamReducer,
	dreamsReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	travel: travelReducer,
	travels: travelsReducer,
	dream: dreamReducer,
	dreams: dreamsReducer,
	map: mapReducer,
});

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
