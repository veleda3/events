import {GET_IMAGES} from '../actions/types'

export function ImageReducer(state = [], action) {
    switch(action.type) {
        case GET_IMAGES:
            return [...state, action]
        default:
            return state
    }
}