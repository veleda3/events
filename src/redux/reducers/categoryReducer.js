import {GET_CATEGORY} from '../actions/types'

export function CategoryReducer(state = [], action) {
    switch(action.type) {
        case GET_CATEGORY:
            return [state, ...action.payload]
        default:
            return state
    }
}