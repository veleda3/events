import {GET_CATEGORY, GET_CATEGORIES} from './types'
import {imageData} from '../../data/images'

export const getCategories = () => dispatch => {
    dispatch({
        type: GET_CATEGORIES,
        payload: imageData
    })
}

// export const  getCategory = (e) => dispatch => {
//     const category = imageData.filter(category => category.category == e.category)
//         dispatch({
//             type: GET_CATEGORY,
//             payload: category
//         })

// }