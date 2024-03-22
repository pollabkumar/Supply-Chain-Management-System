import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from 'redux-thunk';

import { rootReducer } from './rootReducer'

const finalReducer = combineReducers({
    rootReducer
})

const initialState = {
    rootReducer: {
        cartItems: localStorage.getItem('cartIems')
            ? JSON.parse(localStorage.getItem('cartIems'))
            : [],
    },
};

const middleware = [thunk]
const store = createStore(
    finalReducer,
    initialState,


    // or this line
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store