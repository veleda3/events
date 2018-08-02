import {compose, applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers'

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
        )
    )
    return createStore(reducers, initialState, enhancer)
}

export default configureStore({})