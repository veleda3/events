import {combineReducers} from 'redux'
import {CategoriesReducer} from './imagesReducer'
import {CategoryReducer} from '../reducers/categoryReducer'

export default combineReducers({
    categories: CategoriesReducer,
    category: CategoryReducer
})