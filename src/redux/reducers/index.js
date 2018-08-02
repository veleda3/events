import {combineReducers} from 'redux'
import {ImageReducer} from './imagesReducer'

export default combineReducers({
   Images: ImageReducer
})