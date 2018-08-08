import {gql} from 'apollo-boost'

export const getCategoriesQuery = gql`
{
    categories {
        name
        images {
            image
            description
            ranking
            id
            category{
                name
            }
        }        
    }
}
`

export const deleteImageQuery = gql`
    mutation deleteImage($id: ID!) {
        deleteImage(id: $id) {
            id
        }
    }
`