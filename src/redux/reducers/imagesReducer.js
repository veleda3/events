import {GET_CATEGORIES} from '../actions/types'

export function CategoriesReducer(state = [], action) {
    switch(action.type) {
        case GET_CATEGORIES:
            return [...action.payload]
        default:
            return state
    }
}