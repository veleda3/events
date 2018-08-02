import {GET_IMAGES} from './types'
import {imageData} from '../../data/images'

export function GetImages() {
    return {
        type: GET_IMAGES,
        payload: imageData
    }
}